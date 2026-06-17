import assert from "node:assert/strict";
import test from "node:test";

import { catalogueCategories, catalogues } from "../data/catalogues.js";

test("catalogue library contains valid categorized downloads", () => {
  const categories = new Set(
    catalogueCategories
      .filter((category) => category.value !== "all")
      .map((category) => category.value)
  );

  assert.equal(catalogues.length, 2);
  assert.equal(new Set(catalogues.map((catalogue) => catalogue.id)).size, 2);

  for (const catalogue of catalogues) {
    assert.ok(categories.has(catalogue.category));
    assert.ok(catalogue.title.length > 0);
    assert.match(catalogue.image, /^https:\/\/rantechnology\.in\/skydecor\/.+\.(png|jpe?g|webp)$/);
    assert.match(catalogue.pdf, /^https:\/\/rantechnology\.in\/skydecor\/.+\.pdf$/);
  }
});
