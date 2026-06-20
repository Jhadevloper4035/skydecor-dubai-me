import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoot = path.resolve(__dirname, '../..');

const defaultTemplatePath = path.join(
  backendRoot,
  'src/templates/product-specification.html',
);
const defaultProductsPath = path.join(backendRoot, 'src/data/product.json');
const defaultOutputDir = path.join(backendRoot, 'assets/pdf');
const defaultTempDir = path.join(backendRoot, 'tmp/product-pdf-html');

function parseArgs(argv) {
  return argv.reduce(
    (options, arg) => {
      if (arg === '--help' || arg === '-h') {
        options.help = true;
        return options;
      }

      if (arg.startsWith('--product=')) {
        options.productCode = arg.slice('--product='.length).trim().toLowerCase();
        return options;
      }

      if (arg.startsWith('--limit=')) {
        options.limit = Number.parseInt(arg.slice('--limit='.length), 10);
        return options;
      }

      if (arg.startsWith('--output=')) {
        options.outputDir = path.resolve(backendRoot, arg.slice('--output='.length));
        return options;
      }

      if (arg.startsWith('--chrome=')) {
        options.chromePath = arg.slice('--chrome='.length).trim();
        return options;
      }

      return options;
    },
    {
      chromePath: process.env.CHROME_PATH || '',
      help: false,
      limit: undefined,
      outputDir: defaultOutputDir,
      productCode: '',
    },
  );
}

function printHelp() {
  console.log(`
Generate product specification PDFs.

Usage:
  npm run generate:product-pdfs
  npm run generate:product-pdfs -- --product=sdl-10102-fsr
  npm run generate:product-pdfs -- --limit=10
  npm run generate:product-pdfs -- --output=assets/pdf

Environment:
  CHROME_PATH=/path/to/chrome
`);
}

function findChrome(explicitChromePath) {
  if (explicitChromePath && existsSync(explicitChromePath)) {
    return explicitChromePath;
  }

  const candidates = [
    'google-chrome',
    'google-chrome-stable',
    'chromium',
    'chromium-browser',
  ];

  for (const command of candidates) {
    try {
      const resolved = execFileSync('which', [command], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();

      if (resolved) {
        return resolved;
      }
    } catch {
      // Try the next browser binary.
    }
  }

  throw new Error(
    'No Chrome/Chromium binary found. Install Google Chrome or set CHROME_PATH.',
  );
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function titleCase(value) {
  return String(value ?? '')
    .replaceAll('-', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .replace(/\bHpl\b/g, 'HPL');
}

function getProductImage(product) {
  if (Array.isArray(product.image)) {
    return product.image.find(Boolean) || '';
  }

  return product.image || '';
}

function normalizeProduct(product) {
  return {
    ...product,
    category: titleCase(product.category),
    image: getProductImage(product),
    productCode: product.productCode,
    productName: String(product.productName || '').toUpperCase(),
    productType: titleCase(product.productType),
    subCategory: titleCase(product.subCategory),
    texture: titleCase(product.texture),
    textureCode: String(product.textureCode || '').toUpperCase(),
  };
}

function renderTemplate(template, values) {
  return template
    .replace(
      /<%\s*if\s*\(\s*([A-Za-z0-9_]+)\s*\)\s*{\s*%>([\s\S]*?)<%\s*}\s*%>/g,
      (_, key, content) => (values[key] ? content : ''),
    )
    .replace(/<%=\s*([A-Za-z0-9_]+)\s*%>/g, (_, key) =>
      escapeHtml(values[key]),
    );
}

async function loadProducts(productsPath, options) {
  const products = JSON.parse(await readFile(productsPath, 'utf8'));
  let selectedProducts = products;

  if (options.productCode) {
    selectedProducts = selectedProducts.filter(
      (product) => product.productCode?.toLowerCase() === options.productCode,
    );
  }

  if (Number.isInteger(options.limit) && options.limit > 0) {
    selectedProducts = selectedProducts.slice(0, options.limit);
  }

  if (!selectedProducts.length) {
    throw new Error('No products matched the PDF generation filters.');
  }

  return selectedProducts;
}

async function renderPdf({ chromePath, html, outputPath, productCode }) {
  const htmlPath = path.join(defaultTempDir, `${productCode}.html`);
  const userDataDir = path.join(defaultTempDir, `${productCode}-chrome-profile`);

  await writeFile(htmlPath, html, 'utf8');

  const result = spawnSync(
    chromePath,
    [
      '--headless=new',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-crash-reporter',
      '--disable-crashpad',
      '--no-sandbox',
      '--no-pdf-header-footer',
      '--print-to-pdf-no-header',
      `--print-to-pdf=${outputPath}`,
      '--run-all-compositor-stages-before-draw',
      '--virtual-time-budget=10000',
      `--user-data-dir=${userDataDir}`,
      pathToFileURL(htmlPath).href,
    ],
    {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    },
  );

  if (result.status !== 0) {
    throw new Error(
      `Chrome failed for ${productCode}:\n${result.stderr || result.stdout}`,
    );
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    printHelp();
    return;
  }

  const chromePath = findChrome(options.chromePath);
  const [template, products] = await Promise.all([
    readFile(defaultTemplatePath, 'utf8'),
    loadProducts(defaultProductsPath, options),
  ]);

  await mkdir(options.outputDir, { recursive: true });
  await mkdir(defaultTempDir, { recursive: true });

  try {
    for (const product of products) {
      const normalizedProduct = normalizeProduct(product);
      const productCode = normalizedProduct.productCode;
      const outputPath = path.join(options.outputDir, `${productCode}.pdf`);
      const html = renderTemplate(template, normalizedProduct);

      await renderPdf({
        chromePath,
        html,
        outputPath,
        productCode,
      });

      console.log(`Generated ${path.relative(backendRoot, outputPath)}`);
    }
  } finally {
    await rm(defaultTempDir, { force: true, recursive: true });
  }

  console.log(`Done. Generated ${products.length} product PDF(s).`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
