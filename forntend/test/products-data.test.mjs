import assert from "node:assert/strict";
import test from "node:test";

import { productMain } from "../data/products.js";

test("productMain exposes product records for fallback rendering", () => {
  assert.ok(Array.isArray(productMain));
  assert.ok(productMain.length > 0);
  assert.ok(productMain.every((product) => product.id && product.title));
});
