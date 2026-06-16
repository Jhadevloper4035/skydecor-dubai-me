const certificateAsset = (fileName) =>
  `https://skydecor.in/images/certificate/${fileName}`;

export const certificateCategories = [
  { value: "all", label: "All" },
  { value: "iso", label: "ISO" },
  { value: "greenguard", label: "GREENGUARD" },
  { value: "test", label: "Test Reports" },
  { value: "quality", label: "Quality" },
  { value: "nabl", label: "NABL" },
];

export const certificates = [
  ["nabl", "NABL Certification", "NABL-certificate.jpeg", "NABL-certificate.pdf"],
  ["greenguard", "Chalk Grade GREENGUARD Certification", "Chalk-Grade-0.5-MM-2-MM-GREENGUARD-Certification-426910-410.jpeg", "Chalk-Grade-0.5-MM-2-MM-GREENGUARD-Certification-426910-410.pdf"],
  ["greenguard", "Chalk Grade GREENGUARD Gold Certification", "Chalk-Grade-0.5-MM-2-MM-GREENGUARD-Gold-Certification-426910-420.jpeg", "Chalk-Grade-0.5-MM-2-MM-GREENGUARD-Gold-Certification-426910-420.pdf"],
  ["greenguard", "Fire Proofing GREENGUARD Certification", "Fire-Proofing-0.5-MM-18-MM-GREENGUARD-Certification-426906-410.jpeg", "Fire-Proofing-0.5-MM-18-MM-GREENGUARD-Certification-426906-410.pdf"],
  ["greenguard", "Fire Proofing GREENGUARD Gold Certification", "Fire-Proofing-0.5-MM-18-MM-GREENGUARD-Gold-Certification-426906-420.jpeg", "Fire-Proofing-0.5-MM-18-MM-GREENGUARD-Gold-Certification-426906-420.pdf"],
  ["greenguard", "HPL GREENGUARD Certification", "HPL-0.5-MM-18-MM-GREENGUARD-Certification-426905-410.jpeg", "HPL-0.5-MM-18-MM-GREENGUARD-Certification-426905-410.pdf"],
  ["greenguard", "HPL GREENGUARD Gold Certification", "HPL-0.5-MM-18-MM-GREENGUARD-Gold-Certification-426905-420.jpeg", "HPL-0.5-MM-18-MM-GREENGUARD-Gold-Certification-426905-420.pdf"],
  ["greenguard", "Marker Board GREENGUARD Certification", "Marker-Board-0.5-MM-2-MM-GREENGUARD-Certification-426909-410.jpeg", "Marker-Board-0.5-MM-2-MM-GREENGUARD-Certification-426909-410.pdf"],
  ["greenguard", "Marker Grade GREENGUARD Gold Certification", "Marker-Grade-0.5-MM-2-MM-GREENGUARD-Gold-Certification-426909-420.jpeg", "Marker-Grade-0.5-MM-2-MM-GREENGUARD-Gold-Certification-426909-420.pdf"],
  ["greenguard", "Metallic Foil GREENGUARD Certification", "Metallic-Foil-0.6-3-MM-GREENGUARD-Certification-426908-410.jpeg", "Metallic-Foil-0.6-3-MM-GREENGUARD-Certification-426908-410.pdf"],
  ["greenguard", "Metallic Foil GREENGUARD Gold Certification", "Metallic-Foil-0.6-MM-3-MM-GREENGUARD-Gold-Certification-426908-420.jpeg", "Metallic-Foil-0.6-MM-3-MM-GREENGUARD-Gold-Certification-426908-420.pdf"],
  ["greenguard", "Postforming GREENGUARD Certification", "Postforming-0.5-MM-0.7-MM-GREENGUARD-Certification-426907-410.jpeg", "Postforming-0.5-MM-0.7-MM-GREENGUARD-Certification-426907-410.pdf"],
  ["greenguard", "Postforming GREENGUARD Gold Certification", "Postforming-0.5-MM-0.7-MM-GREENGUARD-Gold-Certification-426907-420.jpeg", "Postforming-0.5-MM-0.7-MM-GREENGUARD-Gold-Certification-426907-420.pdf"],
  ["test", "Antibacterial Activity and Efficacy of Acrylic HPL", "C1-0000408983.jpeg", "C1-0000408983.pdf"],
  ["test", "Antibacterial Activity and Efficacy of FR Luvex", "C1-0000408984.jpeg", "C1-0000408984.pdf"],
  ["test", "Fire Resistance FR Luvex", "C1-0000409482.jpeg", "C1-0000409482.pdf"],
  ["test", "Abrasion Resistance FR Luvex", "C1-0000409484.jpeg", "C1-0000409484.pdf"],
  ["test", "Anti Scratch Acrylic HPL", "C1-0000409478.jpeg", "C1-0000409478.pdf"],
  ["test", "Flame Retardant Test FR FLEXI", "1.png", "flame-retardant-test.pdf"],
  ["test", "Flame Retardant Test FR FLEXI 2", "2.png", "flame-retardant-test-2.pdf"],
  ["test", "Material Test Certificate FR FLEXI", "3.png", "quality-control-test.pdf"],
  ["test", "Lead Free Test FR FLEXI", "4.png", "lead-free-test.pdf"],
  ["test", "Anti Bacterial Test FR FLEXI", "5.png", "anti-bacterial-test.pdf"],
  ["test", "Abrasion Resistance FR FLEXI", "6.png", "text-certificate.pdf"],
  ["test", "Anti Bacterial Test Acrylic Laminates", "acrylic-anti-bacterial-test-certificate.jpeg", "acrylic-anti-bacterial-test-certificate.pdf"],
  ["quality", "CII Green Products & Services Council", "7.png", "cii-green-products.pdf"],
  ["quality", "Environmental Product Declaration", "epd.jpeg", "epd.pdf"],
  ["quality", "FSC Certificate", "certificate-fsc-en.jpeg", "certificate-fsc-en.pdf"],
  ["quality", "CE Certificate", "ce-skydecor-hpl.jpeg", "ce-skydecor-hpl.pdf"],
  ["iso", "ISO 14001:2015", "certificates-and-ISO1.jpeg", "certificates-iso-1.pdf"],
  ["iso", "ISO 45001:2018", "certificates-and-ISO2.jpeg", "certificates-iso-2.pdf"],
  ["iso", "ISO 9001:2015", "certificates-and-ISO3.jpeg", "certificates-and-iso-3.pdf"],
  ["test", "Antibacterial Activity and Efficacy of HPL", "antibacterial-activity-and-efficacy-of-hpl.jpeg", "antibacterial-activity-and-efficacy-of-hpl.pdf"],
  ["test", "HPL Antibacterial Performance and Effectiveness", "antibacterial-hpl-performance-and-effectiveness.jpeg", "antibacterial-activity-and-efficacy-of-hpl-1.pdf"],
  ["test", "Flame Retardant Test HPL", "flame-retardant-test-hpl.jpeg", "flame-retardant-test-hpl.pdf"],
].map(([category, title, image, pdf], index) => ({
  id: index + 1,
  category,
  title,
  image: certificateAsset(image),
  pdf: certificateAsset(pdf),
}));

export const getCertificateCategoryLabel = (category) =>
  certificateCategories.find((item) => item.value === category)?.label || category;
