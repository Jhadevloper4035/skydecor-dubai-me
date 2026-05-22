import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import openApiDocument from '../src/docs/openapi.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.resolve(__dirname, '../src');

const routeFile = (fileName) => readFileSync(path.join(srcDir, 'route', fileName), 'utf8');

const normalizePath = (basePath, routePath) => {
  const joined = `${basePath}${routePath === '/' ? '' : routePath}` || '/';
  return joined.replace(/\/+/g, '/').replace(/:([A-Za-z0-9_]+)/g, '{$1}');
};

const collectRouteMethods = (source, basePath) => {
  const routes = [];
  const directRoutePattern = /router\.(get|post|patch|delete)\(\s*['`]([^'`]+)['`]/g;
  const chainedRoutePattern = /router\s*\.route\(\s*['`]([^'`]+)['`]\s*\)([\s\S]*?);/g;
  let match;

  while ((match = directRoutePattern.exec(source))) {
    routes.push(`${match[1].toUpperCase()} ${normalizePath(basePath, match[2])}`);
  }

  while ((match = chainedRoutePattern.exec(source))) {
    const routePath = match[1];
    const chain = match[2];
    const methodPattern = /\.(get|post|patch|delete)\(/g;
    let methodMatch;

    while ((methodMatch = methodPattern.exec(chain))) {
      routes.push(`${methodMatch[1].toUpperCase()} ${normalizePath(basePath, routePath)}`);
    }
  }

  return routes;
};

const collectApiRoutes = () => {
  const apiIndexSource = routeFile('index.js');
  const aliases = [...apiIndexSource.matchAll(/router\.use\(\s*['`]([^'`]+)['`],\s*(\w+)/g)];
  const importMap = Object.fromEntries(
    [...apiIndexSource.matchAll(/import\s+(\w+)\s+from\s+['`]\.\/([^'`]+)\.js['`]/g)].map(
      ([, variableName, fileName]) => [variableName, `${fileName}.js`],
    ),
  );

  return aliases.flatMap(([, mountPath, routerName]) =>
    collectRouteMethods(routeFile(importMap[routerName]), `/api/v1${mountPath}`),
  );
};

const collectAppRoutes = () => [
  ...collectRouteMethods(routeFile('docs.js'), ''),
  ...collectRouteMethods(routeFile('health.js'), ''),
  ...collectRouteMethods(routeFile('scan.js'), '/scan'),
  ...collectApiRoutes(),
];

const collectDocumentedRoutes = () =>
  Object.entries(openApiDocument.paths).flatMap(([routePath, methods]) =>
    Object.keys(methods).map((method) => `${method.toUpperCase()} ${routePath}`),
  );

test('OpenAPI documentation covers every Express route', () => {
  const actualRoutes = [...new Set(collectAppRoutes())].sort();
  const documentedRoutes = new Set(collectDocumentedRoutes());
  const missingRoutes = actualRoutes.filter((route) => !documentedRoutes.has(route));

  assert.deepEqual(missingRoutes, []);
});
