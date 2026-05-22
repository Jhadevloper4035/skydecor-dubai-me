import catchAsync from '../utils/catchAsync.js';
import {
  createImagePresignedUrl,
  createMultipleImagePresignedUrls as createMultiplePresignedUrls,
} from '../service/upload.service.js';
import { sendSuccess } from '../utils/response.js';

export const createSingleImagePresignedUrl = catchAsync(async (req, res) => {
  const presignedUrl = await createImagePresignedUrl(req.body);

  sendSuccess(res, { presignedUrl });
});

export const createMultipleImagePresignedUrls = catchAsync(async (req, res) => {
  const presignedUrls = await createMultiplePresignedUrls(req.body.files, req.body.folder);

  sendSuccess(res, { presignedUrls }, 200, { results: presignedUrls.length });
});
