export const designIdeaGalleryPlaceholders = [
  {
    src: "/images/our-project-image-1.jpg",
    alt: "Interior design gallery placeholder",
  },
  {
    src: "/images/our-project-image-2.jpg",
    alt: "Interior design gallery placeholder",
  },
  {
    src: "/images/our-project-image-3.jpg",
    alt: "Interior design gallery placeholder",
  },
  {
    src: "/images/our-project-image-4.jpg",
    alt: "Interior design gallery placeholder",
  },
  {
    src: "/images/our-project-image-5.jpg",
    alt: "Interior design gallery placeholder",
  },
];

export const designIdeas = [
  {
    slug: "bedroom-design",
    title: "Bedroom Design",
    image: "/images/service-1.jpg",
    imageAlt: "Bedroom design with skydecor surfaces",
    intro:
      "Explore calming bedroom surfaces and finishes that make every space feel personal, practical, and considered.",
  },
  {
    slug: "living-room-design",
    title: "Living Room Design",
    image: "/images/our-project-image-1.jpg",
    imageAlt: "Living room design with skydecor surfaces",
    intro:
      "Discover living-room surface ideas that bring warmth, texture, and lasting performance to the centre of the home.",
  },
  {
    slug: "kitchen-design",
    title: "Kitchen Design",
    image: "/images/our-project-image-2.jpg",
    imageAlt: "Kitchen design with skydecor surfaces",
    intro:
      "Find kitchen finishes designed to balance a refined look with durable, easy-care everyday surfaces.",
  },
  {
    slug: "workspace-design",
    title: "Workspace Design",
    image: "/images/our-project-image-3.jpg",
    imageAlt: "Workspace design with skydecor surfaces",
    intro:
      "Create focused workspaces with decorative surfaces that support clarity, comfort, and a professional finish.",
  },
  {
    slug: "kidroom-design",
    title: "Kidroom Design",
    image: "/images/our-project-image-4.jpg",
    imageAlt: "Kidroom design with skydecor surfaces",
    intro:
      "Browse adaptable kidroom surface ideas that bring colour, character, and dependable performance to growing spaces.",
  },
];

export const getDesignIdea = (slug) =>
  designIdeas.find((idea) => idea.slug === slug);
