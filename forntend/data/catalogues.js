const catalogueAsset = (fileName) =>
  `https://skydecor.in/images/catalouges/${fileName}`;

const cataloguePdf = (fileName) =>
  `https://skydecor.in/catalouges/${fileName}`;

export const catalogueCategories = [
  { value: "all", label: "All Collections" },
  { value: "new", label: "New Arrivals" },
  { value: "popular", label: "Popular" },
];

export const catalogues = [
  {
    id: 1,
    category: "new",
    title: "Design Master 1mm+",
    description: "Premium decorative laminates for expressive residential and commercial interiors.",
    image: catalogueAsset("design-master.jpg"),
    pdf: cataloguePdf("Design_Master_1MM+%20Laminates.pdf"),
    fileName: "Design_Master_1mm+.pdf",
  },
  {
    id: 2,
    category: "popular",
    title: "Maestro FR Flexi Laminates",
    description: "Flexible, fire-retardant surface solutions created for seamless applications.",
    image: catalogueAsset("maestro.jpg"),
    pdf: cataloguePdf("MAESTRO_FR_LEXI_LAMINATES.pdf"),
    fileName: "Maestro_FR_Flexi_Laminates.pdf",
  },
  {
    id: 3,
    category: "new",
    title: "Acrylish Laminates",
    description: "High-gloss acrylic surfaces with rich colour, clarity, and lasting performance.",
    image: catalogueAsset("acrylish-laminate.jpg"),
    pdf: cataloguePdf("Acrylic_Laminates.pdf"),
    fileName: "Acrylish_Laminates.pdf",
  },
  {
    id: 4,
    category: "popular",
    title: "Ambience Collection 2025",
    description: "A versatile 0.8 mm laminate collection spanning contemporary patterns and finishes.",
    image: catalogueAsset("ambience.jpg"),
    pdf: cataloguePdf("AMBIENCE_0.8_mm.pdf"),
    fileName: "Ambience_Collection_2025.pdf",
  },
  {
    id: 5,
    category: "new",
    title: "Moderna Liner Laminates",
    description: "Coordinated liner surfaces in fabric, wood, and solid colour expressions.",
    image: catalogueAsset("moderna.jpg"),
    pdf: cataloguePdf("Liner_Folder_catalogue.pdf"),
    fileName: "Moderna_Liner_Laminates.pdf",
  },
  {
    id: 6,
    category: "popular",
    title: "Soffitto Soffline Panel",
    description: "Linear ceiling and wall panels designed for refined architectural rhythm.",
    image: catalogueAsset("soffline.jpg"),
    pdf: cataloguePdf("SOFFLINE_E-CATALOGUE.pdf"),
    fileName: "Soffitto_Soffline_Panel.pdf",
  },
  {
    id: 7,
    category: "popular",
    title: "Soffitto Verto Panel",
    description: "Vertical panel solutions that bring depth and structure to interior surfaces.",
    image: catalogueAsset("verto.jpg"),
    pdf: cataloguePdf("VERTO_E-CATALOGUE.pdf"),
    fileName: "Soffitto_Verto_Panel.pdf",
  },
  {
    id: 8,
    category: "popular",
    title: "Soffitto Groovex Panel",
    description: "Grooved architectural panels combining visual texture with easy installation.",
    image: catalogueAsset("groovex.jpg"),
    pdf: cataloguePdf("GROOVEX_E-CATALOGUE.pdf"),
    fileName: "Soffitto_Groovex_Panel.pdf",
  },
];

export const getCatalogueCategoryLabel = (category) =>
  catalogueCategories.find((item) => item.value === category)?.label || category;
