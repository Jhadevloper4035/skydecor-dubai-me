

export const catalogueCategories = [
  { value: "all", label: "All Collections" },
  { value: "new", label: "New Arrivals" },
  { value: "popular", label: "Popular" },
];

export const catalogues = [
  {
    id: 1,
    category: "new",
    title: "Design Master",
    description:
      "Explore SkyDecor’s premium Design Master collection, crafted to bring elegance, durability, and distinctive style to modern residential and commercial spaces.",
    image: "https://rantechnology.in/skydecor/design-master.png",
    pdf: "https://rantechnology.in/skydecor/dubai-design-master.pdf",
    fileName: "design_master.pdf",
  },
  {
    id: 2,
    category: "popular",
    title: "Ambience Collection",
    description:
      "Discover SkyDecor’s Ambience Collection, featuring stylish and versatile decorative surfaces designed to create refined, seamless, and contemporary interiors.",
    image: "https://rantechnology.in/skydecor/ambience.png",
    pdf: "https://rantechnology.in/skydecor/ambience.png",
    fileName: "ambience-collection.pdf",
  },
];



export const getCatalogueCategoryLabel = (category) =>
  catalogueCategories.find((item) => item.value === category)?.label || category;
