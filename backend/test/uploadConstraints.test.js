import assert from 'node:assert/strict';
import test from 'node:test';

import {
  imageContentTypes,
  imageExtensionsByContentType,
} from '../src/utils/uploadConstraints.js';

test('image upload constraints include supported raster image types', () => {
  assert.ok(imageContentTypes.includes('image/jpeg'));
  assert.ok(imageContentTypes.includes('image/png'));
  assert.deepEqual(imageExtensionsByContentType['image/webp'], ['.webp']);
});
