import { allBlogs } from "@/data/blogs";
import { events as localEventData } from "@/data/events";

const SERVER_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:8000/api/v1";

const API_BASE_URL =
  typeof window === "undefined" ? SERVER_API_BASE_URL : "/api/v1";

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

const formatDate = (value, fallback = "") => {
  if (!value) return fallback;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback || String(value);

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const splitBody = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (!value) return [];

  return String(value)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
};

const textExcerpt = (value = "", maxLength = 180) => {
  const plainText = String(value).replace(/\s+/g, " ").trim();
  if (plainText.length <= maxLength) return plainText;

  return `${plainText.slice(0, maxLength).trim()}...`;
};

const normalizeLocation = (location) => {
  if (!location) return "";
  if (typeof location === "string") return location;

  return [location.name, location.address, location.city, location.country]
    .filter(Boolean)
    .join(", ");
};

const normalizeSlug = (item = {}) =>
  item.slug || item._id || item.id || String(item.title || "").toLowerCase().replace(/\s+/g, "-");

export const normalizeEvent = (event = {}) => {
  const slug = normalizeSlug(event);
  const images = Array.isArray(event.images) && event.images.length
    ? event.images.filter(Boolean)
    : Array.isArray(event.gallery)
      ? event.gallery.filter(Boolean)
      : [];
  const coverImage =
    event.coverImage || event.imgSrc || images[0] || "/images/our-project-image-1.jpg";
  const description = splitBody(event.description);

  return {
    ...event,
    id: event._id || event.id || slug,
    slug,
    title: event.title || "skydecor Event",
    date: event.date || formatDate(event.startDate, ""),
    location: normalizeLocation(event.location) || "Dubai, UAE",
    coverImage,
    excerpt:
      event.excerpt ||
      event.shortDescription ||
      textExcerpt(description.join(" ") || event.description || event.title),
    description: description.length ? description : [event.shortDescription].filter(Boolean),
    highlights: Array.isArray(event.highlights) ? event.highlights.filter(Boolean) : [],
    gallery: images.length ? images : [coverImage],
  };
};

export const normalizeEvents = (events = []) => events.map(normalizeEvent);

export const normalizeBlog = (blog = {}) => {
  const slug = normalizeSlug(blog);
  const image =
    blog.coverImage ||
    blog.imgSrc ||
    blog.imageSrc ||
    blog.img ||
    "/images/blog/blog-grid-1.jpg";
  const content = splitBody(blog.content || blog.description || blog.desc);
  const excerpt = blog.excerpt || blog.description || blog.desc || textExcerpt(content.join(" "));

  return {
    ...blog,
    id: blog._id || blog.id || slug,
    slug,
    title: blog.title || "skydecor Blog",
    date: blog.date || formatDate(blog.publishedAt || blog.createdAt, ""),
    author: blog.author || blog.authorName || "skydecor Dubai",
    imgSrc: image,
    coverImage: image,
    description: excerpt,
    excerpt,
    content,
    categories: Array.isArray(blog.categories) ? blog.categories : [],
    tags: Array.isArray(blog.tags) ? blog.tags : [],
    href: `/blog-detail/${slug}`,
  };
};

export const normalizeBlogs = (blogs = []) => blogs.map(normalizeBlog);

export const localEvents = normalizeEvents(localEventData);
export const localBlogs = normalizeBlogs(allBlogs);

const getBlogsFromPayload = (payload = {}) => payload.data?.blogs || [];
const getEventsFromPayload = (payload = {}) => payload.data?.events || [];

export const getBlogsFromApi = async (params = {}) => {
  try {
    const response = await fetch(buildUrl("/blogs", { limit: 100, ...params }), {
      cache: "no-store",
    });

    if (!response.ok) return null;

    const payload = await response.json();
    return normalizeBlogs(getBlogsFromPayload(payload));
  } catch {
    return null;
  }
};

export const getEventsFromApi = async (params = {}) => {
  try {
    const response = await fetch(buildUrl("/events", { limit: 100, ...params }), {
      cache: "no-store",
    });

    if (!response.ok) return null;

    const payload = await response.json();
    return normalizeEvents(getEventsFromPayload(payload));
  } catch {
    return null;
  }
};

const looksLikeObjectId = (value) => /^[a-f\d]{24}$/i.test(String(value || ""));

export const getBlogFromApi = async (slugOrId) => {
  try {
    const slugResponse = await fetch(buildUrl(`/blogs/slug/${slugOrId}`), {
      cache: "no-store",
    });

    if (slugResponse.ok) {
      const payload = await slugResponse.json();
      return normalizeBlog(payload.data?.blog);
    }

    if (looksLikeObjectId(slugOrId)) {
      const idResponse = await fetch(buildUrl(`/blogs/${slugOrId}`), {
        cache: "no-store",
      });

      if (idResponse.ok) {
        const payload = await idResponse.json();
        return normalizeBlog(payload.data?.blog);
      }
    }

    return null;
  } catch {
    return null;
  }
};

export const getEventFromApi = async (slugOrId) => {
  try {
    const response = await fetch(buildUrl(`/events/slug/${slugOrId}`), {
      cache: "no-store",
    });

    if (!response.ok) return null;

    const payload = await response.json();
    return normalizeEvent(payload.data?.event);
  } catch {
    return null;
  }
};

export const findFallbackBlog = (slugOrId) => {
  const lookupValue = String(slugOrId || "").toLowerCase();

  return (
    localBlogs.find(
      (blog) =>
        String(blog.id).toLowerCase() === lookupValue ||
        String(blog.slug).toLowerCase() === lookupValue
    ) || null
  );
};

export const findFallbackEvent = (slugOrId) => {
  const lookupValue = String(slugOrId || "").toLowerCase();

  return (
    localEvents.find(
      (event) =>
        String(event.id).toLowerCase() === lookupValue ||
        String(event.slug).toLowerCase() === lookupValue
    ) || null
  );
};
