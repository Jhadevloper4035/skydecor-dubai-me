const objectId = {
  type: 'string',
  example: '6635f2f95a8e5e2d8a4d7b11',
};

const dateTime = {
  type: 'string',
  format: 'date-time',
  example: '2026-05-08T05:12:27.575Z',
};

const success = {
  type: 'string',
  example: 'success',
};

const pagination = {
  type: 'object',
  properties: {
    page: { type: 'integer', example: 1 },
    limit: { type: 'integer', example: 20 },
    total: { type: 'integer', example: 266 },
    pages: { type: 'integer', example: 14 },
  },
};

const errorResponse = {
  type: 'object',
  properties: {
    status: { type: 'string', example: 'fail' },
    message: { type: 'string', example: 'Validation failed.' },
    code: { type: 'string', example: 'VALIDATION_ERROR' },
    requestId: { type: 'string' },
  },
};

const ok = (description = 'Successful response') => ({
  description,
});

const created = (description = 'Created successfully') => ({
  description,
});

const noContent = {
  description: 'Deleted successfully',
};

const validationError = {
  description: 'Validation error',
  content: {
    'application/json': {
      schema: errorResponse,
    },
  },
};

const unauthorized = {
  description: 'Authentication failed or bearer token is missing',
  content: {
    'application/json': {
      schema: errorResponse,
    },
  },
};

const forbidden = {
  description: 'The authenticated admin does not have permission',
  content: {
    'application/json': {
      schema: errorResponse,
    },
  },
};

const notFound = {
  description: 'Resource not found',
  content: {
    'application/json': {
      schema: errorResponse,
    },
  },
};

const gone = {
  description: 'Resource is inactive or expired',
  content: {
    'application/json': {
      schema: errorResponse,
    },
  },
};

const bearerAuth = [{ bearerAuth: [] }];

const jsonBody = (schemaRef, required = true) => ({
  required,
  content: {
    'application/json': {
      schema: {
        $ref: `#/components/schemas/${schemaRef}`,
      },
    },
  },
});

const idParam = {
  name: 'id',
  in: 'path',
  required: true,
  schema: objectId,
};

const slugParam = {
  name: 'slug',
  in: 'path',
  required: true,
  schema: { type: 'string', example: 'dubai-interior-design' },
};

const pageLimitParams = [
  {
    name: 'page',
    in: 'query',
    schema: { type: 'integer', minimum: 1, default: 1 },
  },
  {
    name: 'limit',
    in: 'query',
    schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
  },
];

const enumQuery = (name, values) => ({
  name,
  in: 'query',
  schema: { type: 'string', enum: values },
});

const textQuery = (name, example) => ({
  name,
  in: 'query',
  schema: { type: 'string', example },
});

const boolQuery = (name) => ({
  name,
  in: 'query',
  schema: { type: 'boolean' },
});

const listResponse = (collectionName, schemaName) => ({
  type: 'object',
  properties: {
    status: success,
    results: { type: 'integer', example: 1 },
    pagination,
    data: {
      type: 'object',
      properties: {
        [collectionName]: {
          type: 'array',
          items: { $ref: `#/components/schemas/${schemaName}` },
        },
      },
    },
    requestId: { type: 'string' },
  },
});

const itemResponse = (name, schemaName) => ({
  type: 'object',
  properties: {
    status: success,
    data: {
      type: 'object',
      properties: {
        [name]: { $ref: `#/components/schemas/${schemaName}` },
      },
    },
    requestId: { type: 'string' },
  },
});

const presignedUrlResponse = {
  type: 'object',
  properties: {
    status: success,
    data: {
      type: 'object',
      properties: {
        presignedUrl: { $ref: '#/components/schemas/PresignedUrl' },
      },
    },
  },
};

const multiplePresignedUrlsResponse = {
  type: 'object',
  properties: {
    status: success,
    results: { type: 'integer', example: 2 },
    data: {
      type: 'object',
      properties: {
        presignedUrls: {
          type: 'array',
          items: { $ref: '#/components/schemas/PresignedUrl' },
        },
      },
    },
  },
};

const crudPath = ({
  tag,
  collectionName,
  itemName,
  schemaName,
  createSchema,
  updateSchema,
  listParameters = pageLimitParams,
  adminCreate = true,
  adminList = false,
  adminItem = false,
}) => ({
  collection: {
    get: {
      tags: [tag],
      summary: `List ${collectionName}`,
      security: adminList ? bearerAuth : undefined,
      parameters: listParameters,
      responses: {
        200: {
          description: `${collectionName} list`,
          content: {
            'application/json': {
              schema: listResponse(collectionName, schemaName),
            },
          },
        },
        401: adminList ? unauthorized : undefined,
      },
    },
    post: {
      tags: [tag],
      summary: `Create ${itemName}`,
      security: adminCreate ? bearerAuth : undefined,
      requestBody: jsonBody(createSchema),
      responses: {
        201: {
          ...created(`${itemName} created`),
          content: {
            'application/json': {
              schema: itemResponse(itemName, schemaName),
            },
          },
        },
        400: validationError,
        401: adminCreate ? unauthorized : undefined,
      },
    },
  },
  item: {
    get: {
      tags: [tag],
      summary: `Get ${itemName} by id`,
      security: adminItem ? bearerAuth : undefined,
      parameters: [idParam],
      responses: {
        200: {
          ...ok(`${itemName} details`),
          content: {
            'application/json': {
              schema: itemResponse(itemName, schemaName),
            },
          },
        },
        401: adminItem ? unauthorized : undefined,
        404: notFound,
      },
    },
    patch: {
      tags: [tag],
      summary: `Update ${itemName}`,
      security: bearerAuth,
      parameters: [idParam],
      requestBody: jsonBody(updateSchema),
      responses: {
        200: {
          ...ok(`${itemName} updated`),
          content: {
            'application/json': {
              schema: itemResponse(itemName, schemaName),
            },
          },
        },
        400: validationError,
        401: unauthorized,
        404: notFound,
      },
    },
    delete: {
      tags: [tag],
      summary: `Delete ${itemName}`,
      security: bearerAuth,
      parameters: [idParam],
      responses: {
        204: noContent,
        401: unauthorized,
        404: notFound,
      },
    },
  },
});

const withSlugLookup = (tag, itemName, schemaName) => ({
  get: {
    tags: [tag],
    summary: `Get ${itemName} by slug`,
    parameters: [slugParam],
    responses: {
      200: {
        ...ok(`${itemName} details`),
        content: {
          'application/json': {
            schema: itemResponse(itemName, schemaName),
          },
        },
      },
      404: notFound,
    },
  },
});

const imagePresignedPath = (tag, summary = 'Create image upload presigned URL') => ({
  post: {
    tags: [tag, 'Uploads'],
    summary,
    security: bearerAuth,
    requestBody: jsonBody('SingleImagePresignedUrlRequest'),
    responses: {
      200: {
        ...ok('Presigned upload URL created'),
        content: {
          'application/json': {
            schema: presignedUrlResponse,
          },
        },
      },
      400: validationError,
      401: unauthorized,
    },
  },
});

const multipleImagePresignedPath = (tag, summary = 'Create image upload presigned URLs') => ({
  post: {
    tags: [tag, 'Uploads'],
    summary,
    security: bearerAuth,
    requestBody: jsonBody('MultipleImagePresignedUrlsRequest'),
    responses: {
      200: {
        ...ok('Presigned upload URLs created'),
        content: {
          'application/json': {
            schema: multiplePresignedUrlsResponse,
          },
        },
      },
      400: validationError,
      401: unauthorized,
    },
  },
});

const blogCrud = crudPath({
  tag: 'Blogs',
  collectionName: 'blogs',
  itemName: 'blog',
  schemaName: 'Blog',
  createSchema: 'BlogCreate',
  updateSchema: 'BlogUpdate',
  listParameters: [
    ...pageLimitParams,
    enumQuery('status', ['draft', 'published', 'archived']),
    textQuery('category', 'design'),
    textQuery('tag', 'dubai'),
    boolQuery('isFeatured'),
    textQuery('search', 'interior'),
  ],
});

const eventCrud = crudPath({
  tag: 'Events',
  collectionName: 'events',
  itemName: 'event',
  schemaName: 'Event',
  createSchema: 'EventCreate',
  updateSchema: 'EventUpdate',
  listParameters: [
    ...pageLimitParams,
    enumQuery('status', ['draft', 'upcoming', 'ongoing', 'completed', 'cancelled']),
    boolQuery('isFeatured'),
    textQuery('search', 'expo'),
  ],
});

const pageSeoCrud = crudPath({
  tag: 'Page SEO',
  collectionName: 'pageSeos',
  itemName: 'pageSeo',
  schemaName: 'PageSeo',
  createSchema: 'PageSeoCreate',
  updateSchema: 'PageSeoUpdate',
  listParameters: [
    ...pageLimitParams,
    enumQuery('status', ['active', 'inactive']),
    textQuery('search', 'home'),
  ],
});

const productEnquiryCrud = crudPath({
  tag: 'Product Enquiries',
  collectionName: 'productEnquiries',
  itemName: 'productEnquiry',
  schemaName: 'ProductEnquiry',
  createSchema: 'ProductEnquiryCreate',
  updateSchema: 'ProductEnquiryUpdate',
  listParameters: [
    ...pageLimitParams,
    enumQuery('status', ['new', 'contacted', 'quoted', 'closed', 'cancelled']),
    textQuery('productCode', 'sdl-10102-fsr'),
    textQuery('email', 'customer@example.com'),
    textQuery('search', 'sdl'),
  ],
  adminCreate: false,
  adminList: true,
  adminItem: true,
});

const enquiryCrud = crudPath({
  tag: 'Enquiries',
  collectionName: 'enquiries',
  itemName: 'enquiry',
  schemaName: 'Enquiry',
  createSchema: 'EnquiryCreate',
  updateSchema: 'EnquiryUpdate',
  listParameters: [
    ...pageLimitParams,
    enumQuery('status', ['new', 'contacted', 'in_progress', 'closed', 'cancelled']),
    textQuery('service', 'interior-design'),
    textQuery('email', 'customer@example.com'),
    textQuery('search', 'villa'),
  ],
  adminCreate: false,
  adminList: true,
  adminItem: true,
});

const productCrud = crudPath({
  tag: 'Products',
  collectionName: 'products',
  itemName: 'product',
  schemaName: 'Product',
  createSchema: 'ProductCreate',
  updateSchema: 'ProductUpdate',
  listParameters: [
    ...pageLimitParams,
    textQuery('query', 'frosty white'),
    textQuery('productType', 'design-master'),
    textQuery('category', 'solid'),
    textQuery('subCategory', 'solid-textured'),
    textQuery('texture', 'flute silk raso'),
    textQuery('textureCode', 'FSR'),
    textQuery('size', '4ft*8ft'),
    textQuery('thickness', '0.8mm'),
    textQuery('width', '1220mm'),
    textQuery('productCode', 'sdl-10102-fsr'),
    enumQuery('status', ['active', 'inactive']),
    boolQuery('isActive'),
    enumQuery('sortBy', ['createdAt', 'productName', 'productCode', 'category', 'productType']),
    enumQuery('sortOrder', ['asc', 'desc']),
  ],
});
delete productCrud.item.get;

const qrCodeCrud = crudPath({
  tag: 'QR Codes',
  collectionName: 'qrCodes',
  itemName: 'qrCode',
  schemaName: 'QRCode',
  createSchema: 'QRCodeCreate',
  updateSchema: 'QRCodeUpdate',
  listParameters: [
    ...pageLimitParams,
    enumQuery('status', ['active', 'inactive', 'expired']),
    textQuery('category', 'solid'),
    textQuery('subcategory', 'solid-textured'),
    textQuery('productType', 'design-master'),
    textQuery('productCode', 'SDL-10102-FSR'),
    textQuery('search', 'sdl'),
  ],
  adminCreate: true,
  adminList: true,
  adminItem: true,
});

const aliasPaths = (base, paths) =>
  Object.fromEntries(
    Object.entries(paths).map(([path, value]) => [path.replace('{base}', base), value]),
  );

const resourcePaths = (base, crud, extra = {}) =>
  aliasPaths(base, {
    '/api/v1/{base}': crud.collection,
    '/api/v1/{base}/{id}': crud.item,
    ...extra,
  });

const openApiDocument = {
  openapi: '3.0.3',
  info: {
    title: 'SkyDecor Dubai API',
    version: '1.0.0',
    description:
      'Swagger documentation for the SkyDecor Dubai backend routes, including admin, content, product, QR code, enquiry, upload, scan, and health endpoints.',
  },
  servers: [
    {
      url: 'http://localhost:8000',
      description: 'Local development server',
    },
    {
      url: '/',
      description: 'Current host',
    },
  ],
  tags: [
    { name: 'Health' },
    { name: 'Auth' },
    { name: 'Blogs' },
    { name: 'Events' },
    { name: 'Page SEO' },
    { name: 'Products' },
    { name: 'Product Enquiries' },
    { name: 'Enquiries' },
    { name: 'QR Codes' },
    { name: 'Uploads' },
    { name: 'Scan' },
  ],
  paths: {
    '/api-docs': {
      get: {
        tags: ['Health'],
        summary: 'Open Swagger UI',
        responses: {
          200: {
            description: 'Swagger UI HTML page',
            content: {
              'text/html': {
                schema: { type: 'string' },
              },
            },
          },
        },
      },
    },
    '/api-docs.json': {
      get: {
        tags: ['Health'],
        summary: 'Get raw OpenAPI document',
        responses: {
          200: {
            description: 'OpenAPI document',
            content: {
              'application/json': {
                schema: { type: 'object' },
              },
            },
          },
        },
      },
    },
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Liveness check',
        responses: {
          200: {
            ...ok('Process is alive'),
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: success,
                    data: {
                      type: 'object',
                      properties: {
                        health: { type: 'string', example: 'ok' },
                      },
                    },
                    requestId: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/ready': {
      get: {
        tags: ['Health'],
        summary: 'Readiness check',
        responses: {
          200: {
            ...ok('Database is connected'),
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: success,
                    data: {
                      type: 'object',
                      properties: {
                        db: { type: 'string', example: 'connected' },
                      },
                    },
                    requestId: { type: 'string' },
                  },
                },
              },
            },
          },
          503: {
            ...ok('Database is disconnected'),
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'error' },
                    data: {
                      type: 'object',
                      properties: {
                        db: { type: 'string', example: 'disconnected' },
                      },
                    },
                    requestId: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/v1/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login admin',
        requestBody: jsonBody('AdminLogin'),
        responses: {
          200: {
            ...ok('Admin authenticated'),
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: success,
                    data: {
                      type: 'object',
                      properties: {
                        token: { type: 'string' },
                        admin: { $ref: '#/components/schemas/Admin' },
                      },
                    },
                  },
                },
              },
            },
          },
          400: validationError,
          401: unauthorized,
        },
      },
    },
    '/api/v1/auth/me': {
      get: {
        tags: ['Auth'],
        summary: 'Get current admin profile',
        security: bearerAuth,
        responses: {
          200: {
            ...ok('Current admin'),
            content: {
              'application/json': {
                schema: itemResponse('admin', 'Admin'),
              },
            },
          },
          401: unauthorized,
        },
      },
    },
    '/api/v1/auth/admins': {
      get: {
        tags: ['Auth'],
        summary: 'List admins',
        security: bearerAuth,
        responses: {
          200: {
            ...ok('Admin list'),
            content: {
              'application/json': {
                schema: listResponse('admins', 'Admin'),
              },
            },
          },
          401: unauthorized,
          403: forbidden,
        },
      },
      post: {
        tags: ['Auth'],
        summary: 'Create admin',
        security: bearerAuth,
        requestBody: jsonBody('AdminCreate'),
        responses: {
          201: {
            ...created('Admin created and token returned'),
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: success,
                    data: {
                      type: 'object',
                      properties: {
                        token: { type: 'string' },
                        admin: { $ref: '#/components/schemas/Admin' },
                      },
                    },
                  },
                },
              },
            },
          },
          400: validationError,
          401: unauthorized,
          403: forbidden,
        },
      },
    },
    '/api/v1/auth/admins/{id}': {
      patch: {
        tags: ['Auth'],
        summary: 'Update admin',
        security: bearerAuth,
        parameters: [idParam],
        requestBody: jsonBody('AdminUpdate'),
        responses: {
          200: {
            ...ok('Admin updated'),
            content: {
              'application/json': {
                schema: itemResponse('admin', 'Admin'),
              },
            },
          },
          400: validationError,
          401: unauthorized,
          403: forbidden,
          404: notFound,
        },
      },
      delete: {
        tags: ['Auth'],
        summary: 'Delete admin',
        security: bearerAuth,
        parameters: [idParam],
        responses: {
          204: noContent,
          400: validationError,
          401: unauthorized,
          403: forbidden,
          404: notFound,
        },
      },
    },
    ...resourcePaths('blogs', blogCrud, {
      '/api/v1/{base}/slug/{slug}': withSlugLookup('Blogs', 'blog', 'Blog'),
      '/api/v1/{base}/image/presigned-url': imagePresignedPath('Blogs'),
    }),
    ...resourcePaths('events', eventCrud, {
      '/api/v1/{base}/slug/{slug}': withSlugLookup('Events', 'event', 'Event'),
      '/api/v1/{base}/image/presigned-url': imagePresignedPath('Events'),
      '/api/v1/{base}/images/presigned-urls': multipleImagePresignedPath('Events'),
    }),
    ...resourcePaths('page-seos', pageSeoCrud, {
      '/api/v1/{base}/slug/{slug}': withSlugLookup('Page SEO', 'pageSeo', 'PageSeo'),
      '/api/v1/{base}/image/presigned-url': imagePresignedPath('Page SEO'),
    }),
    ...resourcePaths('page-seo', pageSeoCrud, {
      '/api/v1/{base}/slug/{slug}': withSlugLookup('Page SEO', 'pageSeo', 'PageSeo'),
      '/api/v1/{base}/image/presigned-url': imagePresignedPath('Page SEO'),
    }),
    ...resourcePaths('product-enquiries', productEnquiryCrud),
    ...resourcePaths('product-enquiry', productEnquiryCrud),
    ...resourcePaths('enquiries', enquiryCrud),
    ...resourcePaths('enquiry', enquiryCrud),
    ...resourcePaths('products', productCrud, {
      '/api/v1/{base}/filters': {
        get: {
          tags: ['Products'],
          summary: 'Get product filter options',
          parameters: [
            textQuery('productType', 'design-master'),
            textQuery('category', 'solid'),
            textQuery('subCategory', 'solid-textured'),
            textQuery('texture', 'flute silk raso'),
          ],
          responses: {
            200: ok('Filter options'),
          },
        },
      },
      '/api/v1/{base}/autocomplete': {
        get: {
          tags: ['Products'],
          summary: 'Get product autocomplete suggestions',
          parameters: [
            {
              name: 'query',
              in: 'query',
              required: true,
              schema: { type: 'string', minLength: 2, example: 'sdl' },
            },
            {
              name: 'limit',
              in: 'query',
              schema: { type: 'integer', minimum: 1, maximum: 50, default: 10 },
            },
          ],
          responses: {
            200: ok('Autocomplete suggestions'),
            400: validationError,
          },
        },
      },
      '/api/v1/{base}/lookup/{slugOrId}': {
        get: {
          tags: ['Products'],
          summary: 'Get product by MongoDB id or product code slug',
          parameters: [
            {
              name: 'slugOrId',
              in: 'path',
              required: true,
              schema: { type: 'string', example: 'sdl-10102-fsr' },
            },
          ],
          responses: {
            200: {
              ...ok('Product details'),
              content: {
                'application/json': {
                  schema: itemResponse('product', 'Product'),
                },
              },
            },
            404: notFound,
          },
        },
      },
    }),
    ...resourcePaths('product', productCrud, {
      '/api/v1/{base}/filters': {
        get: {
          tags: ['Products'],
          summary: 'Get product filter options',
          responses: { 200: ok('Filter options') },
        },
      },
      '/api/v1/{base}/autocomplete': {
        get: {
          tags: ['Products'],
          summary: 'Get product autocomplete suggestions',
          parameters: [textQuery('query', 'sdl')],
          responses: { 200: ok('Autocomplete suggestions'), 400: validationError },
        },
      },
      '/api/v1/{base}/lookup/{slugOrId}': {
        get: {
          tags: ['Products'],
          summary: 'Get product by MongoDB id or product code slug',
          parameters: [
            {
              name: 'slugOrId',
              in: 'path',
              required: true,
              schema: { type: 'string', example: 'sdl-10102-fsr' },
            },
          ],
          responses: { 200: ok('Product details'), 404: notFound },
        },
      },
    }),
    ...resourcePaths('qrcodes', qrCodeCrud, {
      '/api/v1/{base}/stats': {
        get: {
          tags: ['QR Codes'],
          summary: 'Get QR code statistics',
          security: bearerAuth,
          responses: {
            200: {
              ...ok('QR code stats'),
              content: {
                'application/json': {
                  schema: itemResponse('stats', 'QRCodeStats'),
                },
              },
            },
            401: unauthorized,
          },
        },
      },
      '/api/v1/{base}/image/presigned-url': imagePresignedPath('QR Codes'),
      '/api/v1/{base}/scan/{code}': {
        get: {
          tags: ['QR Codes', 'Scan'],
          summary: 'Scan QR code and redirect to product PDF',
          parameters: [
            {
              name: 'code',
              in: 'path',
              required: true,
              schema: { type: 'string', example: 'SDL-10102-FSR' },
            },
          ],
          responses: {
            302: { description: 'Redirects to the QR code product PDF URL' },
            404: notFound,
            410: gone,
          },
        },
      },
      '/api/v1/{base}/scan/{productType}/{productCode}': {
        post: {
          tags: ['QR Codes', 'Scan'],
          summary: 'Record QR code scan',
          parameters: [
            {
              name: 'productType',
              in: 'path',
              required: true,
              schema: { type: 'string', example: 'design-master' },
            },
            {
              name: 'productCode',
              in: 'path',
              required: true,
              schema: { type: 'string', example: 'SDL-10102-FSR' },
            },
          ],
          requestBody: jsonBody('QRCodeScanRequest', false),
          responses: {
            200: {
              ...ok('Scan recorded'),
              content: {
                'application/json': {
                  schema: itemResponse('qrCode', 'QRCode'),
                },
              },
            },
            404: notFound,
            410: gone,
          },
        },
      },
    }),
    ...resourcePaths('qrcode', qrCodeCrud, {
      '/api/v1/{base}/stats': {
        get: {
          tags: ['QR Codes'],
          summary: 'Get QR code statistics',
          security: bearerAuth,
          responses: { 200: ok('QR code stats'), 401: unauthorized },
        },
      },
      '/api/v1/{base}/image/presigned-url': imagePresignedPath('QR Codes'),
      '/api/v1/{base}/scan/{code}': {
        get: {
          tags: ['QR Codes', 'Scan'],
          summary: 'Scan QR code and redirect to product PDF',
          parameters: [
            {
              name: 'code',
              in: 'path',
              required: true,
              schema: { type: 'string', example: 'SDL-10102-FSR' },
            },
          ],
          responses: { 302: { description: 'Redirects to PDF' }, 404: notFound, 410: gone },
        },
      },
      '/api/v1/{base}/scan/{productType}/{productCode}': {
        post: {
          tags: ['QR Codes', 'Scan'],
          summary: 'Record QR code scan',
          parameters: [
            {
              name: 'productType',
              in: 'path',
              required: true,
              schema: { type: 'string', example: 'design-master' },
            },
            {
              name: 'productCode',
              in: 'path',
              required: true,
              schema: { type: 'string', example: 'SDL-10102-FSR' },
            },
          ],
          responses: { 200: ok('Scan recorded'), 404: notFound, 410: gone },
        },
      },
    }),
    '/api/v1/uploads/presigned-url': imagePresignedPath('Uploads'),
    '/api/v1/upload/presigned-url': imagePresignedPath('Uploads'),
    '/api/v1/uploads/presigned-urls': multipleImagePresignedPath('Uploads'),
    '/api/v1/upload/presigned-urls': multipleImagePresignedPath('Uploads'),
    '/scan/qr-code/{productType}/{productCode}': {
      get: {
        tags: ['Scan'],
        summary: 'Scan QR code and redirect to product PDF',
        parameters: [
          {
            name: 'productType',
            in: 'path',
            required: true,
            schema: { type: 'string', example: 'design-master' },
          },
          {
            name: 'productCode',
            in: 'path',
            required: true,
            schema: { type: 'string', example: 'SDL-10102-FSR' },
          },
        ],
        responses: {
          302: { description: 'Redirects to the product PDF URL' },
          404: notFound,
          410: gone,
        },
      },
    },
    '/scan/{code}': {
      get: {
        tags: ['Scan'],
        summary: 'Scan QR code by code and redirect to product PDF',
        parameters: [
          {
            name: 'code',
            in: 'path',
            required: true,
            schema: { type: 'string', example: 'SDL-10102-FSR' },
          },
        ],
        responses: {
          302: { description: 'Redirects to the product PDF URL' },
          404: notFound,
          410: gone,
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      Error: errorResponse,
      Admin: {
        type: 'object',
        properties: {
          _id: objectId,
          name: { type: 'string', example: 'SkyDecor Admin' },
          email: { type: 'string', format: 'email', example: 'admin@skydecor.ae' },
          role: { type: 'string', enum: ['admin', 'superadmin'], example: 'admin' },
          isActive: { type: 'boolean', example: true },
          lastLoginAt: dateTime,
          createdAt: dateTime,
          updatedAt: dateTime,
        },
      },
      AdminLogin: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'admin@skydecor.ae' },
          password: { type: 'string', format: 'password', example: 'StrongPass123' },
        },
      },
      AdminCreate: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string', example: 'Operations Admin' },
          email: { type: 'string', format: 'email', example: 'ops@skydecor.ae' },
          password: { type: 'string', minLength: 8, example: 'StrongPass123' },
          role: { type: 'string', enum: ['admin', 'superadmin'], default: 'admin' },
          isActive: { type: 'boolean', default: true },
        },
      },
      AdminUpdate: {
        allOf: [{ $ref: '#/components/schemas/AdminCreate' }],
      },
      Blog: {
        type: 'object',
        properties: {
          _id: objectId,
          title: { type: 'string', example: 'Interior Design Ideas in Dubai' },
          slug: { type: 'string', example: 'interior-design-ideas-dubai' },
          excerpt: { type: 'string' },
          content: { type: 'string' },
          coverImage: { type: 'string', format: 'uri' },
          authorName: { type: 'string', example: 'SkyDecor Dubai' },
          categories: { type: 'array', items: { type: 'string' } },
          tags: { type: 'array', items: { type: 'string' } },
          metaTitle: { type: 'string' },
          metaDescription: { type: 'string' },
          status: { type: 'string', enum: ['draft', 'published', 'archived'] },
          isFeatured: { type: 'boolean' },
          publishedAt: dateTime,
          createdAt: dateTime,
          updatedAt: dateTime,
        },
      },
      BlogCreate: {
        type: 'object',
        required: ['title', 'slug', 'content'],
        properties: {
          title: { type: 'string' },
          slug: { type: 'string' },
          excerpt: { type: 'string', maxLength: 300 },
          content: { type: 'string' },
          coverImage: { type: 'string', format: 'uri' },
          authorName: { type: 'string' },
          categories: { type: 'array', items: { type: 'string' } },
          tags: { type: 'array', items: { type: 'string' } },
          metaTitle: { type: 'string', maxLength: 70 },
          metaDescription: { type: 'string', maxLength: 170 },
          status: { type: 'string', enum: ['draft', 'published', 'archived'] },
          isFeatured: { type: 'boolean' },
          publishedAt: { type: 'string', format: 'date-time' },
        },
      },
      BlogUpdate: {
        allOf: [{ $ref: '#/components/schemas/BlogCreate' }],
      },
      Event: {
        type: 'object',
        properties: {
          _id: objectId,
          title: { type: 'string' },
          slug: { type: 'string' },
          shortDescription: { type: 'string' },
          description: { type: 'string' },
          startDate: dateTime,
          endDate: dateTime,
          location: { $ref: '#/components/schemas/EventLocation' },
          images: { type: 'array', items: { type: 'string', format: 'uri' } },
          registrationUrl: { type: 'string', format: 'uri' },
          metaTitle: { type: 'string' },
          metaDescription: { type: 'string' },
          status: {
            type: 'string',
            enum: ['draft', 'upcoming', 'ongoing', 'completed', 'cancelled'],
          },
          isFeatured: { type: 'boolean' },
          hasEnded: { type: 'boolean' },
          createdAt: dateTime,
          updatedAt: dateTime,
        },
      },
      EventLocation: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          address: { type: 'string' },
          city: { type: 'string', example: 'Dubai' },
          country: { type: 'string', example: 'UAE' },
        },
      },
      EventCreate: {
        type: 'object',
        required: ['title', 'slug', 'description', 'startDate'],
        properties: {
          title: { type: 'string' },
          slug: { type: 'string' },
          shortDescription: { type: 'string', maxLength: 300 },
          description: { type: 'string' },
          startDate: { type: 'string', format: 'date-time' },
          endDate: { type: 'string', format: 'date-time' },
          location: { $ref: '#/components/schemas/EventLocation' },
          images: { type: 'array', items: { type: 'string', format: 'uri' } },
          registrationUrl: { type: 'string', format: 'uri' },
          metaTitle: { type: 'string', maxLength: 70 },
          metaDescription: { type: 'string', maxLength: 170 },
          status: {
            type: 'string',
            enum: ['draft', 'upcoming', 'ongoing', 'completed', 'cancelled'],
          },
          isFeatured: { type: 'boolean' },
        },
      },
      EventUpdate: {
        allOf: [{ $ref: '#/components/schemas/EventCreate' }],
      },
      PageSeo: {
        type: 'object',
        properties: {
          _id: objectId,
          pageName: { type: 'string' },
          pageSlug: { type: 'string' },
          metaTitle: { type: 'string' },
          metaDescription: { type: 'string' },
          metaKeywords: { type: 'array', items: { type: 'string' } },
          canonicalUrl: { type: 'string', format: 'uri' },
          ogTitle: { type: 'string' },
          ogDescription: { type: 'string' },
          ogImage: { type: 'string', format: 'uri' },
          twitterTitle: { type: 'string' },
          twitterDescription: { type: 'string' },
          twitterImage: { type: 'string', format: 'uri' },
          robots: {
            type: 'string',
            enum: ['index,follow', 'noindex,follow', 'index,nofollow', 'noindex,nofollow'],
          },
          status: { type: 'string', enum: ['active', 'inactive'] },
          createdAt: dateTime,
          updatedAt: dateTime,
        },
      },
      PageSeoCreate: {
        type: 'object',
        required: ['pageName', 'pageSlug', 'metaTitle', 'metaDescription'],
        properties: {
          pageName: { type: 'string' },
          pageSlug: { type: 'string' },
          metaTitle: { type: 'string', maxLength: 70 },
          metaDescription: { type: 'string', maxLength: 170 },
          metaKeywords: { type: 'array', items: { type: 'string' } },
          canonicalUrl: { type: 'string', format: 'uri' },
          ogTitle: { type: 'string', maxLength: 70 },
          ogDescription: { type: 'string', maxLength: 170 },
          ogImage: { type: 'string', format: 'uri' },
          twitterTitle: { type: 'string', maxLength: 70 },
          twitterDescription: { type: 'string', maxLength: 170 },
          twitterImage: { type: 'string', format: 'uri' },
          robots: {
            type: 'string',
            enum: ['index,follow', 'noindex,follow', 'index,nofollow', 'noindex,nofollow'],
          },
          status: { type: 'string', enum: ['active', 'inactive'] },
        },
      },
      PageSeoUpdate: {
        allOf: [{ $ref: '#/components/schemas/PageSeoCreate' }],
      },
      Product: {
        type: 'object',
        properties: {
          _id: objectId,
          id: { type: 'integer', example: 1 },
          productCode: { type: 'string', example: 'sdl-10102-fsr' },
          productCodeSlug: { type: 'string', example: 'sdl-10102-fsr' },
          productType: { type: 'string', example: 'design-master' },
          productTypeSlug: { type: 'string', example: 'design-master' },
          productName: { type: 'string', example: 'sdl-10102' },
          designName: { type: 'string', example: 'frosty white' },
          category: { type: 'string', example: 'solid' },
          categorySlug: { type: 'string', example: 'solid' },
          subCategory: { type: 'string', example: 'solid-textured' },
          subCategorySlug: { type: 'string', example: 'solid-textured' },
          textureCode: { type: 'string', example: 'FSR' },
          texture: { type: 'string', example: 'flute silk raso' },
          textureSlug: { type: 'string', example: 'flute-silk-raso' },
          size: { type: 'string', example: '4ft*8ft' },
          thickness: { type: 'string', example: '0.8mm' },
          width: { type: 'string', example: '1220mm' },
          image: { type: 'array', items: { type: 'string', format: 'uri' } },
          images: { type: 'array', items: { type: 'string', format: 'uri' } },
          pdfUrlPath: { type: 'string', format: 'uri' },
          isActive: { type: 'boolean', example: true },
          status: { type: 'string', enum: ['active', 'inactive'], example: 'active' },
          createdAt: dateTime,
          updatedAt: dateTime,
        },
      },
      ProductCreate: {
        type: 'object',
        required: [
          'productCode',
          'productType',
          'productName',
          'category',
          'subCategory',
          'size',
          'thickness',
          'width',
          'image',
          'pdfUrlPath',
        ],
        properties: {
          id: { type: 'integer', minimum: 1 },
          productCode: { type: 'string', example: 'sdl-10102-fsr' },
          productType: { type: 'string', example: 'design-master' },
          productName: { type: 'string', example: 'sdl-10102' },
          designName: { type: 'string', example: 'frosty white' },
          category: { type: 'string', example: 'solid' },
          subCategory: { type: 'string', example: 'solid-textured' },
          textureCode: { type: 'string', example: 'FSR' },
          texture: { type: 'string', example: 'flute silk raso' },
          size: { type: 'string', example: '4ft*8ft' },
          thickness: { type: 'string', example: '0.8mm' },
          width: { type: 'string', example: '1220mm' },
          image: { type: 'array', items: { type: 'string', format: 'uri' } },
          pdfUrlPath: { type: 'string', format: 'uri' },
          isActive: { type: 'boolean' },
          status: { type: 'string', enum: ['active', 'inactive'] },
        },
      },
      ProductUpdate: {
        allOf: [{ $ref: '#/components/schemas/ProductCreate' }],
      },
      Enquiry: {
        type: 'object',
        properties: {
          _id: objectId,
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string' },
          subject: { type: 'string' },
          service: { type: 'string' },
          message: { type: 'string' },
          source: { type: 'string', enum: ['website', 'whatsapp', 'phone', 'email', 'admin'] },
          status: {
            type: 'string',
            enum: ['new', 'contacted', 'in_progress', 'closed', 'cancelled'],
          },
          assignedTo: { type: 'string' },
          notes: { type: 'string' },
          ipAddress: { type: 'string' },
          userAgent: { type: 'string' },
          createdAt: dateTime,
          updatedAt: dateTime,
        },
      },
      EnquiryCreate: {
        type: 'object',
        required: ['name', 'email', 'phone', 'message'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string' },
          subject: { type: 'string' },
          service: { type: 'string' },
          message: { type: 'string' },
          source: { type: 'string', enum: ['website', 'whatsapp', 'phone', 'email', 'admin'] },
          status: {
            type: 'string',
            enum: ['new', 'contacted', 'in_progress', 'closed', 'cancelled'],
          },
          assignedTo: { type: 'string' },
          notes: { type: 'string' },
        },
      },
      EnquiryUpdate: {
        allOf: [{ $ref: '#/components/schemas/EnquiryCreate' }],
      },
      ProductEnquiry: {
        type: 'object',
        properties: {
          _id: objectId,
          productCode: { type: 'string' },
          productName: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string' },
          companyName: { type: 'string' },
          quantity: { type: 'integer', minimum: 1 },
          message: { type: 'string' },
          source: { type: 'string', enum: ['website', 'whatsapp', 'phone', 'email', 'admin'] },
          status: { type: 'string', enum: ['new', 'contacted', 'quoted', 'closed', 'cancelled'] },
          assignedTo: { type: 'string' },
          notes: { type: 'string' },
          ipAddress: { type: 'string' },
          userAgent: { type: 'string' },
          createdAt: dateTime,
          updatedAt: dateTime,
        },
      },
      ProductEnquiryCreate: {
        type: 'object',
        required: ['productCode', 'productName', 'name', 'email', 'phone'],
        properties: {
          productCode: { type: 'string', example: 'sdl-10102-fsr' },
          productName: { type: 'string', example: 'sdl-10102' },
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string' },
          companyName: { type: 'string' },
          quantity: { type: 'integer', minimum: 1, default: 1 },
          message: { type: 'string' },
          source: { type: 'string', enum: ['website', 'whatsapp', 'phone', 'email', 'admin'] },
          status: { type: 'string', enum: ['new', 'contacted', 'quoted', 'closed', 'cancelled'] },
          assignedTo: { type: 'string' },
          notes: { type: 'string' },
        },
      },
      ProductEnquiryUpdate: {
        allOf: [{ $ref: '#/components/schemas/ProductEnquiryCreate' }],
      },
      QRCode: {
        type: 'object',
        properties: {
          _id: objectId,
          id: { type: 'integer', example: 1 },
          productCode: { type: 'string', example: 'SDL-10102-FSR' },
          productName: { type: 'string', example: 'sdl-10102' },
          category: { type: 'string', example: 'solid' },
          subcategory: { type: 'string', example: 'solid-textured' },
          productType: { type: 'string', example: 'design-master' },
          qrCodeImage: { type: 'string', format: 'uri' },
          linkInQrCode: { type: 'string', format: 'uri' },
          productPdfPath: { type: 'string', format: 'uri' },
          productImageUrl: { type: 'string', format: 'uri' },
          scanCount: { type: 'integer', example: 3 },
          lastScannedAt: dateTime,
          scanHistory: {
            type: 'array',
            items: { $ref: '#/components/schemas/QRCodeScanHistory' },
          },
          status: { type: 'string', enum: ['active', 'inactive', 'expired'] },
          expiryDate: dateTime,
          generatedBy: { type: 'string', example: 'system' },
          isExpired: { type: 'boolean' },
          fullProductName: { type: 'string' },
          createdAt: dateTime,
          updatedAt: dateTime,
        },
      },
      QRCodeScanHistory: {
        type: 'object',
        properties: {
          scannedAt: dateTime,
          ipAddress: { type: 'string' },
          userAgent: { type: 'string' },
        },
      },
      QRCodeCreate: {
        type: 'object',
        required: [
          'productCode',
          'productName',
          'category',
          'subcategory',
          'productType',
          'qrCodeImage',
          'linkInQrCode',
          'productPdfPath',
          'productImageUrl',
        ],
        properties: {
          id: { type: 'integer', minimum: 1 },
          productCode: { type: 'string', example: 'SDL-10102-FSR' },
          productName: { type: 'string', example: 'sdl-10102' },
          category: { type: 'string', example: 'solid' },
          subcategory: { type: 'string', example: 'solid-textured' },
          productType: { type: 'string', example: 'design-master' },
          qrCodeImage: { type: 'string', format: 'uri' },
          linkInQrCode: { type: 'string', format: 'uri' },
          productPdfPath: { type: 'string' },
          productImageUrl: { type: 'string', format: 'uri' },
          status: { type: 'string', enum: ['active', 'inactive', 'expired'] },
          expiryDate: { type: 'string', format: 'date-time' },
          generatedBy: { type: 'string' },
        },
      },
      QRCodeUpdate: {
        allOf: [{ $ref: '#/components/schemas/QRCodeCreate' }],
      },
      QRCodeScanRequest: {
        type: 'object',
        properties: {
          location: { type: 'string', example: 'Dubai showroom' },
        },
      },
      QRCodeStats: {
        type: 'object',
        properties: {
          totalQRCodes: { type: 'integer', example: 266 },
          totalScans: { type: 'integer', example: 1200 },
          activeQRCodes: { type: 'integer', example: 250 },
          inactiveQRCodes: { type: 'integer', example: 10 },
          expiredQRCodes: { type: 'integer', example: 6 },
        },
      },
      SingleImagePresignedUrlRequest: {
        type: 'object',
        required: ['fileName', 'contentType', 'fileSize'],
        properties: {
          fileName: { type: 'string', example: 'product.jpg' },
          contentType: {
            type: 'string',
            example: 'image/jpeg',
            enum: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'],
          },
          fileSize: { type: 'integer', minimum: 1, example: 240000 },
          folder: { type: 'string', example: 'products' },
        },
      },
      MultipleImagePresignedUrlsRequest: {
        type: 'object',
        required: ['files'],
        properties: {
          folder: { type: 'string', example: 'events' },
          files: {
            type: 'array',
            items: {
              allOf: [{ $ref: '#/components/schemas/SingleImagePresignedUrlRequest' }],
            },
          },
        },
      },
      PresignedUrl: {
        type: 'object',
        properties: {
          uploadUrl: { type: 'string', format: 'uri' },
          publicUrl: { type: 'string', format: 'uri' },
          key: { type: 'string', example: 'uploads/images/products/product.jpg' },
          expiresIn: { type: 'integer', example: 300 },
        },
      },
    },
  },
};

export default openApiDocument;
