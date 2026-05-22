import slugify from 'slugify';

const createSlug = (value = '') =>
  slugify(value, {
    lower: true,
    strict: true,
    trim: true,
  });

export default createSlug;
