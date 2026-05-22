import assert from 'node:assert/strict';
import test from 'node:test';

import createSlug from '../src/utils/slug.js';

test('createSlug returns lowercase URL-safe slugs', () => {
  assert.equal(createSlug('Sky Decor Product 101'), 'sky-decor-product-101');
  assert.equal(createSlug('  Premium / Wall Panel!  '), 'premium-wall-panel');
});
