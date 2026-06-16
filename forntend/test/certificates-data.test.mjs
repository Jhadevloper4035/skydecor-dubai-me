import assert from "node:assert/strict";
import test from "node:test";

import {
  certificateCategories,
  certificates,
} from "../data/certificates.js";

test("certificate library contains valid categorized documents", () => {
  const categories = new Set(
    certificateCategories
      .filter((category) => category.value !== "all")
      .map((category) => category.value)
  );

  assert.equal(certificates.length, 35);
  assert.equal(new Set(certificates.map((certificate) => certificate.id)).size, 35);

  for (const certificate of certificates) {
    assert.ok(categories.has(certificate.category));
    assert.ok(certificate.title.length > 0);
    assert.match(certificate.image, /^https:\/\/skydecor\.in\/images\/certificate\/.+/);
    assert.match(certificate.pdf, /^https:\/\/skydecor\.in\/images\/certificate\/.+\.pdf$/);
  }
});
