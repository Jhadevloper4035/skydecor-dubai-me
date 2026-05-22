import { readFileSync, writeFileSync } from 'fs';

const products = JSON.parse(readFileSync('./product.json', 'utf-8'));

const updated = products.map((product) => ({
  ...product,
  image: product.image
    ? (Array.isArray(product.image) ? product.image : product.image.split(','))
        .map((url) => url.trim())
        .filter(Boolean)
    : [],
}));

writeFileSync('./products_updated.json', JSON.stringify(updated, null, 2));
console.log(`Done. ${updated.length} products processed.`);
