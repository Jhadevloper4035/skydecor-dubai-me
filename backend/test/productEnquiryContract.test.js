import assert from 'node:assert/strict';
import test from 'node:test';

import mongoose from 'mongoose';

import ProductEnquiry from '../src/model/productEnquiry.model.js';

test('product enquiries retain the canonical product relationship', async () => {
  const productId = new mongoose.Types.ObjectId();
  const enquiry = new ProductEnquiry({
    product: productId,
    productCode: 'sdl-40408-skr',
    productName: 'sdl-40408',
    name: 'Project Designer',
    email: 'designer@example.com',
    phone: '+971500000000',
    quantity: 25,
  });

  await enquiry.validate();

  assert.equal(enquiry.product.toString(), productId.toString());
  assert.equal(enquiry.productCode, 'SDL-40408-SKR');
  assert.equal(enquiry.email, 'designer@example.com');
  assert.equal(enquiry.status, 'new');
  assert.equal(enquiry.source, 'website');
});

test('product enquiries require a product relationship and code', async () => {
  const enquiry = new ProductEnquiry({
    productName: 'Missing Product',
    name: 'Project Designer',
    email: 'designer@example.com',
    phone: '+971500000000',
  });

  await assert.rejects(() => enquiry.validate(), /product.*required/i);
});
