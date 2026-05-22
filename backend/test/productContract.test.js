import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import Product from '../src/model/product.model.js';

test('all seeded products match the product model contract', async () => {
  const products = JSON.parse(await readFile(new URL('../src/data/product.json', import.meta.url)));

  for (const product of products) {
    await assert.doesNotReject(() => new Product(product).validate(), product.productCode);
  }
});

test('product status and isActive stay synchronized', async () => {
  const inactiveProduct = new Product({
    id: 9999,
    productCode: 'SDL-TEST-INACTIVE',
    productType: 'design-master',
    productName: 'sdl-test',
    category: 'foil',
    subCategory: 'foil',
    size: '4ft*8ft',
    thickness: '0.8mm',
    width: '1220mm',
    image: ['https://example.com/product.jpg'],
    pdfUrlPath: 'https://example.com/product.pdf',
    status: 'inactive',
  });

  await inactiveProduct.validate();

  assert.equal(inactiveProduct.productCode, 'sdl-test-inactive');
  assert.equal(inactiveProduct.status, 'inactive');
  assert.equal(inactiveProduct.isActive, false);
});
