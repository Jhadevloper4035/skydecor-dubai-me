import { Router } from 'express';

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductAutocomplete,
  getProductFilterOptions,
  getProducts,
  updateProduct,
} from '../controller/product.controller.js';
import { requireAdmin } from '../middleware/auth.js';
import { validate } from '../validator/index.js';
import {
  autocompleteProductsValidator,
  createProductValidator,
  listProductsValidator,
  productFilterOptionsValidator,
  productIdValidator,
  productLookupValidator,
  updateProductValidator,
} from '../validator/product.validator.js';

const router = Router();

router
  .route('/')
  .get(listProductsValidator, validate, getProducts)
  .post(requireAdmin, createProductValidator, validate, createProduct);

router.get('/filters', productFilterOptionsValidator, validate, getProductFilterOptions);
router.get('/autocomplete', autocompleteProductsValidator, validate, getProductAutocomplete);
router.get('/lookup/:slugOrId', productLookupValidator, validate, getProduct);

router
  .route('/:id')
  .patch(requireAdmin, productIdValidator, updateProductValidator, validate, updateProduct)
  .delete(requireAdmin, productIdValidator, validate, deleteProduct);

export default router;
