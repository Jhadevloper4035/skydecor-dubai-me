"use client";

import { create } from "zustand";

import {
  findFallbackBlog,
  findFallbackEvent,
  getBlogFromApi,
  getBlogsFromApi,
  getEventFromApi,
  getEventsFromApi,
  localBlogs,
  localEvents,
  normalizeBlog,
  normalizeEvent,
} from "@/lib/contentApi";

const useContentStore = create((set, get) => ({
  blogs: localBlogs,
  blogsStatus: "idle",
  blogsError: null,
  events: localEvents,
  eventsStatus: "idle",
  eventsError: null,
  selectedBlog: null,
  selectedBlogStatus: "idle",
  selectedBlogError: null,
  selectedEvent: null,
  selectedEventStatus: "idle",
  selectedEventError: null,

  fetchBlogs: async (params = {}, force = false) => {
    const { blogsStatus } = get();
    if (!force && (blogsStatus === "loading" || blogsStatus === "succeeded")) return;

    set({ blogsStatus: "loading", blogsError: null });
    try {
      const blogs = await getBlogsFromApi(params);
      set({ blogsStatus: "succeeded", blogs: blogs?.length ? blogs : localBlogs });
    } catch (error) {
      set({ blogsStatus: "failed", blogsError: error.message });
    }
  },

  fetchEvents: async (params = {}, force = false) => {
    const { eventsStatus } = get();
    if (!force && (eventsStatus === "loading" || eventsStatus === "succeeded")) return;

    set({ eventsStatus: "loading", eventsError: null });
    try {
      const events = await getEventsFromApi(params);
      set({ eventsStatus: "succeeded", events: events?.length ? events : localEvents });
    } catch (error) {
      set({ eventsStatus: "failed", eventsError: error.message });
    }
  },

  fetchBlogBySlug: async (slugOrId) => {
    set({ selectedBlogStatus: "loading", selectedBlogError: null });
    try {
      const blog = (await getBlogFromApi(slugOrId)) || findFallbackBlog(slugOrId);
      const selectedBlog = blog ? normalizeBlog(blog) : null;
      set({
        selectedBlogStatus: selectedBlog ? "succeeded" : "failed",
        selectedBlog,
        selectedBlogError: selectedBlog ? null : "Blog not found",
      });
    } catch (error) {
      set({ selectedBlogStatus: "failed", selectedBlogError: error.message });
    }
  },

  fetchEventBySlug: async (slugOrId) => {
    set({ selectedEventStatus: "loading", selectedEventError: null });
    try {
      const event = (await getEventFromApi(slugOrId)) || findFallbackEvent(slugOrId);
      const selectedEvent = event ? normalizeEvent(event) : null;
      set({
        selectedEventStatus: selectedEvent ? "succeeded" : "failed",
        selectedEvent,
        selectedEventError: selectedEvent ? null : "Event not found",
      });
    } catch (error) {
      set({ selectedEventStatus: "failed", selectedEventError: error.message });
    }
  },

  setSelectedBlog: (blog) =>
    set({
      selectedBlog: blog ? normalizeBlog(blog) : null,
      selectedBlogStatus: blog ? "succeeded" : "idle",
      selectedBlogError: null,
    }),

  setSelectedEvent: (event) =>
    set({
      selectedEvent: event ? normalizeEvent(event) : null,
      selectedEventStatus: event ? "succeeded" : "idle",
      selectedEventError: null,
    }),
}));

export default useContentStore;
