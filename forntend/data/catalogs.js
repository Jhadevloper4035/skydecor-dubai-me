export const catalogCategories = [
  { value: "all", label: "All Collections" },
  { value: "new", label: "New Arrivals" },
  { value: "popular", label: "Popular" },
];

export const catalogs = [
  {
    id: 1,
    category: "new",
    title: "Design Master 1mm+",
    description:
      "Explore premium 1mm+ decorative HPL featuring elegant textures, contemporary patterns, and durable finishes for residential and commercial interiors.",
    image: "https://rantechnology.in/skydecor/design-master.png",
    pdf: "https://rantechnology.in/skydecor/dubai-design-master.pdf",
    fileName: "Design_Master_1mm_Plus.pdf",
  },
  {
    id: 2,
    category: "popular",
    title: "Ambience Collection",
    description:
      "Discover sophisticated decorative HPL designed to create warm, stylish, and inviting interior spaces with modern colours, textures, and finishes.",
    image: "https://rantechnology.in/skydecor/ambience.png",
    pdf: "https://rantechnology.in/skydecor/ambience.pdf",
    fileName: "Ambience_Collection.pdf",
  },
];

export const getCatalogCategoryLabel = (category) =>
  catalogCategories.find((item) => item.value === category)?.label || category;
