export const events = [
  {
    id: 1,
    slug: "dubai-design-week-surface-showcase",
    title: "Dubai Design Week Surface Showcase",
    date: "12 Mar 2026",
    location: "Dubai Design District, Dubai",
    coverImage: "/images/our-project-image-1.jpg",
    excerpt:
      "A curated surface-material showcase for designers, architects, and project owners exploring premium HPL applications.",
    description: [
      "Skydecor Dubai hosted an immersive product experience focused on contemporary HPL surfaces for residential, retail, hospitality, and workplace interiors.",
      "The event brought together architects, contractors, and design consultants for live product walkthroughs, finish comparisons, and conversations around practical material selection for UAE projects.",
      "Guests explored woodgrain, solid, stone, and textured finishes through sample boards, mood settings, and guided consultations with the Skydecor team.",
    ],
    highlights: [
      "Live HPL finish presentation",
      "Designer and contractor networking",
      "Material guidance for active Dubai projects",
      "Hands-on product sample display",
    ],
    gallery: [
      "/images/our-project-image-1.jpg",
      "/images/our-project-image-2.jpg",
      "/images/our-project-image-3.jpg",
      "/images/gallery/gallery-furniture1.jpg",
      "/images/gallery/gallery-furniture2.jpg",
      "/images/gallery/gallery-furniture3.jpg",
    ],
  },
  {
    id: 2,
    slug: "architects-meet-experience-center",
    title: "Architects Meet at Experience Center",
    date: "24 Feb 2026",
    location: "Skydecor Experience Center, Dubai",
    coverImage: "/images/post-1.jpg",
    excerpt:
      "An intimate knowledge session for architecture and interior teams featuring material demos, design discussions, and project consultation.",
    description: [
      "Our experience center hosted a focused architects meet designed to help professionals evaluate finishes with real samples and project-specific context.",
      "The session covered durability, finish coordination, and how premium HPL surfaces can support fast-moving commercial and residential interiors.",
      "The event closed with one-to-one conversations around upcoming projects, sample requirements, and specification support.",
    ],
    highlights: [
      "Knowledge-led design session",
      "Experience center walkthrough",
      "Specification support discussions",
      "Finish pairing recommendations",
    ],
    gallery: [
      "/images/post-1.jpg",
      "/images/post-2.jpg",
      "/images/post-3.jpg",
      "/images/gallery/gallery-1.jpg",
      "/images/gallery/gallery-2.jpg",
      "/images/gallery/gallery-3.jpg",
    ],
  },
  {
    id: 3,
    slug: "dubai-wood-show-2025",
    title: "Skydecor at Dubai Wood Show 2025",
    date: "17 Apr 2025",
    location: "Dubai World Trade Centre",
    coverImage: "/images/gallery/gallery-22.jpg",
    excerpt:
      "A trade-show presence built around new surface ideas, product conversations, and meeting partners from across the region.",
    description: [
      "Skydecor participated in Dubai Wood Show with a display crafted for professionals who work with wood, panels, HPL, and interior surface materials.",
      "Visitors explored our product range, discussed upcoming requirements, and connected with the team for catalogs, samples, and project support.",
      "The event helped strengthen relationships with dealers, designers, and construction teams across the UAE market.",
    ],
    highlights: [
      "Regional trade-show participation",
      "Product range display",
      "Dealer and designer meetings",
      "Catalog and sample requests",
    ],
    gallery: [
      "/images/gallery/gallery-22.jpg",
      "/images/gallery/gallery-23.jpg",
      "/images/gallery/gallery-24.jpg",
      "/images/gallery/gallery-25.jpg",
      "/images/gallery/gallery-26.jpg",
      "/images/gallery/gallery-27.jpg",
    ],
  },
  {
    id: 4,
    slug: "hospitality-interiors-material-evening",
    title: "Hospitality Interiors Material Evening",
    date: "08 Jan 2025",
    location: "Business Bay, Dubai",
    coverImage: "/images/our-project-image-4.jpg",
    excerpt:
      "A product evening for hospitality project teams exploring surface solutions for hotels, restaurants, and high-traffic interiors.",
    description: [
      "This event focused on hospitality-grade material conversations, from guest-room palettes to restaurant counters and public-area wall features.",
      "The Skydecor team demonstrated how different finishes can be grouped to create warm, durable, and premium-looking spaces.",
      "Participants reviewed sample combinations and discussed practical installation, maintenance, and procurement needs.",
    ],
    highlights: [
      "Hospitality-focused material guidance",
      "Finish palette consultation",
      "High-traffic application discussion",
      "Project team networking",
    ],
    gallery: [
      "/images/our-project-image-4.jpg",
      "/images/our-project-image-5.jpg",
      "/images/our-project-image-6.jpg",
      "/images/gallery/gallery-10.jpg",
      "/images/gallery/gallery-11.jpg",
      "/images/gallery/gallery-12.jpg",
    ],
  },
];

export const getEventBySlug = (slug) =>
  events.find((event) => event.slug === slug);
