import assert from "node:assert/strict";
import test from "node:test";

import { catalogCategories, catalogs } from "../data/catalogs.js";

test("catalog library contains valid categorized downloads", () => {
  const categories = new Set(
    catalogCategories
      .filter((category) => category.value !== "all")
      .map((category) => category.value)
  );

  assert.equal(catalogs.length, 2);
  assert.equal(new Set(catalogs.map((catalog) => catalog.id)).size, 2);

  for (const catalog of catalogs) {
    assert.ok(categories.has(catalog.category));
    assert.ok(catalog.title.length > 0);
    assert.match(catalog.image, /^https:\/\/rantechnology\.in\/skydecor\/.+\.(png|jpe?g|webp)$/);
    assert.match(catalog.pdf, /^https:\/\/rantechnology\.in\/skydecor\/.+\.pdf$/);
  }
});
