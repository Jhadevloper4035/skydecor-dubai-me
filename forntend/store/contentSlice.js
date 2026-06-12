import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

export const fetchBlogs = createAsyncThunk(
  "content/fetchBlogs",
  async (params = {}) => {
    const blogs = await getBlogsFromApi(params);
    return blogs?.length ? blogs : localBlogs;
  },
  {
    condition: (_, { getState }) => {
      const status = getState().content?.blogsStatus;
      return status !== "loading" && status !== "succeeded";
    },
  }
);

export const fetchEvents = createAsyncThunk(
  "content/fetchEvents",
  async (params = {}) => {
    const events = await getEventsFromApi(params);
    return events?.length ? events : localEvents;
  },
  {
    condition: (_, { getState }) => {
      const status = getState().content?.eventsStatus;
      return status !== "loading" && status !== "succeeded";
    },
  }
);

export const fetchBlogBySlug = createAsyncThunk(
  "content/fetchBlogBySlug",
  async (slugOrId) => {
    const blog = (await getBlogFromApi(slugOrId)) || findFallbackBlog(slugOrId);
    return blog ? normalizeBlog(blog) : null;
  }
);

export const fetchEventBySlug = createAsyncThunk(
  "content/fetchEventBySlug",
  async (slugOrId) => {
    const event = (await getEventFromApi(slugOrId)) || findFallbackEvent(slugOrId);
    return event ? normalizeEvent(event) : null;
  }
);

const contentSlice = createSlice({
  name: "content",
  initialState: {
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
  },
  reducers: {
    setSelectedBlog: (state, action) => {
      state.selectedBlog = action.payload ? normalizeBlog(action.payload) : null;
      state.selectedBlogStatus = action.payload ? "succeeded" : "idle";
      state.selectedBlogError = null;
    },
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload ? normalizeEvent(action.payload) : null;
      state.selectedEventStatus = action.payload ? "succeeded" : "idle";
      state.selectedEventError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.blogsStatus = "loading";
        state.blogsError = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogsStatus = "succeeded";
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.blogsStatus = "failed";
        state.blogsError = action.error.message;
      })
      .addCase(fetchEvents.pending, (state) => {
        state.eventsStatus = "loading";
        state.eventsError = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.eventsStatus = "succeeded";
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.eventsStatus = "failed";
        state.eventsError = action.error.message;
      })
      .addCase(fetchBlogBySlug.pending, (state) => {
        state.selectedBlogStatus = "loading";
        state.selectedBlogError = null;
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.selectedBlogStatus = action.payload ? "succeeded" : "failed";
        state.selectedBlog = action.payload;
        state.selectedBlogError = action.payload ? null : "Blog not found";
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        state.selectedBlogStatus = "failed";
        state.selectedBlogError = action.error.message;
      })
      .addCase(fetchEventBySlug.pending, (state) => {
        state.selectedEventStatus = "loading";
        state.selectedEventError = null;
      })
      .addCase(fetchEventBySlug.fulfilled, (state, action) => {
        state.selectedEventStatus = action.payload ? "succeeded" : "failed";
        state.selectedEvent = action.payload;
        state.selectedEventError = action.payload ? null : "Event not found";
      })
      .addCase(fetchEventBySlug.rejected, (state, action) => {
        state.selectedEventStatus = "failed";
        state.selectedEventError = action.error.message;
      });
  },
});

export const selectBlogs = (state) => state.content.blogs;
export const selectBlogsStatus = (state) => state.content.blogsStatus;
export const selectEvents = (state) => state.content.events;
export const selectEventsStatus = (state) => state.content.eventsStatus;
export const selectSelectedBlog = (state) => state.content.selectedBlog;
export const selectSelectedEvent = (state) => state.content.selectedEvent;

export const { setSelectedBlog, setSelectedEvent } = contentSlice.actions;

export default contentSlice.reducer;
