export const sendSuccess = (res, data = {}, statusCode = 200, meta = {}) =>
  res.status(statusCode).json({
    status: 'success',
    ...meta,
    data,
    requestId: res.req.id,
  });

export const sendCreated = (res, data = {}, meta = {}) => sendSuccess(res, data, 201, meta);

export const sendList = (res, collectionName, items, pagination) =>
  sendSuccess(res, { [collectionName]: items }, 200, {
    results: items.length,
    ...(pagination ? { pagination } : {}),
  });

export const sendNoContent = (res) => res.status(204).send();
