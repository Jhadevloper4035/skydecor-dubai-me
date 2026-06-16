const SERVER_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:8000/api/v1";

const API_BASE_URL =
  typeof window === "undefined" ? SERVER_API_BASE_URL : "/api/v1";

const useLocalFallback = process.env.NODE_ENV !== "production";

const buildUrl = (path, params = {}) => {
  const isAbsoluteUrl = /^https?:\/\//.test(API_BASE_URL);
  const url = isAbsoluteUrl
    ? new URL(`${API_BASE_URL}${path}`)
    : new URL(`${API_BASE_URL}${path}`, "http://localhost");

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  return isAbsoluteUrl ? url.toString() : `${url.pathname}${url.search}`;
};

const splitBody = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (!value) return [];

  return String(value)
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
};

export const localJobs = [
  {
    id: "sales-executive-dubai",
    title: "Sales Executive",
    slug: "sales-executive-dubai",
    department: "Sales",
    location: "Dubai, UAE",
    employmentType: "full-time",
    experienceLevel: "2+ years",
    summary:
      "Build relationships with architects, designers, contractors, and dealers while growing SkyDecor laminate sales across Dubai.",
    description:
      "This role is for someone who enjoys meeting people, understanding project needs, and presenting premium laminate solutions with confidence. You will work closely with customers from first enquiry through sample selection and order coordination.",
    responsibilities: [
      "Visit architects, interior designers, contractors, and dealer partners.",
      "Understand project requirements and recommend suitable SkyDecor products.",
      "Coordinate samples, quotations, follow-ups, and sales pipeline updates.",
      "Represent SkyDecor professionally at events, showrooms, and trade meetings.",
    ],
    requirements: [
      "Experience in laminates, interiors, building materials, or B2B sales.",
      "Strong communication and relationship-building skills.",
      "Comfortable with daily field visits across Dubai and nearby markets.",
    ],
    benefits: [
      "Growth-focused sales culture",
      "Product training and showroom support",
      "Performance-linked opportunity",
    ],
    isFeatured: true,
  },
  {
    id: "interior-design-consultant",
    title: "Interior Design Consultant",
    slug: "interior-design-consultant",
    department: "Design Advisory",
    location: "Dubai, UAE",
    employmentType: "full-time",
    experienceLevel: "1-3 years",
    summary:
      "Help customers and design professionals select finishes, palettes, and laminate combinations for residential and commercial spaces.",
    description:
      "You will support walk-in customers, design studios, and project teams by translating design intent into practical surface recommendations. The role combines product knowledge, visual taste, and patient consultation.",
    responsibilities: [
      "Guide customers through laminate finishes, textures, and color families.",
      "Prepare finish combinations for kitchens, wardrobes, retail, and hospitality spaces.",
      "Support sample boards, product displays, and experience-center walkthroughs.",
    ],
    requirements: [
      "Interior design or surface material knowledge.",
      "A good eye for color, texture, and application context.",
      "Confident presentation and customer-facing communication.",
    ],
    benefits: ["Creative work environment", "Premium material exposure", "Project consultation experience"],
    isFeatured: false,
  },
  {
    id: "warehouse-coordinator",
    title: "Warehouse Coordinator",
    slug: "warehouse-coordinator",
    department: "Operations",
    location: "Dubai, UAE",
    employmentType: "full-time",
    experienceLevel: "2+ years",
    summary:
      "Coordinate stock movement, dispatch readiness, inventory checks, and warehouse documentation for SkyDecor product operations.",
    description:
      "This role keeps product flow reliable. You will coordinate with sales, logistics, and warehouse teams to make sure inventory and dispatch activity is accurate and timely.",
    responsibilities: [
      "Maintain stock records and support inventory checks.",
      "Coordinate picking, packing, dispatch, and delivery documentation.",
      "Communicate stock availability updates to internal teams.",
    ],
    requirements: [
      "Warehouse or inventory coordination experience.",
      "Good documentation habits and attention to detail.",
      "Comfortable coordinating with multiple internal teams.",
    ],
    benefits: ["Stable operations role", "Team-led environment", "Structured product systems"],
    isFeatured: false,
  },
];

export const normalizeJob = (job = {}) => ({
  ...job,
  id: job._id || job.id || job.slug,
  slug: job.slug,
  title: job.title || "Open Position",
  department: job.department || "SkyDecor",
  location: job.location || "Dubai, UAE",
  employmentType: job.employmentType || "full-time",
  experienceLevel: job.experienceLevel || "",
  summary: job.summary || "",
  description: job.description || "",
  responsibilities: splitBody(job.responsibilities),
  requirements: splitBody(job.requirements),
  benefits: splitBody(job.benefits),
  href: `/career/${job.slug}`,
});

export const normalizeJobs = (jobs = []) => jobs.map(normalizeJob);

const getJobsFromPayload = (payload = {}) => payload.data?.jobs || [];

export const getJobsFromApi = async (params = {}) => {
  try {
    const response = await fetch(buildUrl("/jobs", { limit: 100, ...params }), {
      cache: "no-store",
    });

    if (!response.ok) return undefined;

    const payload = await response.json();
    return normalizeJobs(getJobsFromPayload(payload));
  } catch {
    return undefined;
  }
};

export const getJobFromApi = async (slug) => {
  try {
    const response = await fetch(buildUrl(`/jobs/slug/${slug}`), {
      cache: "no-store",
    });

    if (response.status === 404) return null;
    if (!response.ok) return undefined;

    const payload = await response.json();
    return payload.data?.job ? normalizeJob(payload.data.job) : null;
  } catch {
    return undefined;
  }
};

export const getJobs = async () => {
  const jobs = await getJobsFromApi();
  if (jobs !== undefined) return jobs;

  return useLocalFallback ? normalizeJobs(localJobs) : [];
};

export const getJobBySlug = async (slug) => {
  const job = await getJobFromApi(slug);

  if (job !== undefined) return job;

  if (!useLocalFallback) return null;

  return normalizeJobs(localJobs).find((item) => item.slug === slug) || null;
};

export const submitJobApplication = async (payload) => {
  const response = await fetch(buildUrl("/job-applications"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unable to submit application.");
  }

  return data.data?.application;
};
