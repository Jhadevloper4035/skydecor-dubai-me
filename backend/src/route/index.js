import { Router } from 'express';

import authRouter from './auth.js';
import blogRouter from './blog.js';
import enquiryRouter from './enquiry.js';
import eventRouter from './event.js';
import pageSeoRouter from './pageSeo.js';
import productEnquiryRouter from './productEnquiry.js';
import productRouter from './product.js';
import qrCodeRouter from './qrcode.js';
import uploadRouter from './upload.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/blogs', blogRouter);
router.use('/events', eventRouter);
router.use('/page-seos', pageSeoRouter);
router.use('/page-seo', pageSeoRouter);
router.use('/product-enquiries', productEnquiryRouter);
router.use('/product-enquiry', productEnquiryRouter);
router.use('/products', productRouter);
router.use('/product', productRouter);
router.use('/enquiries', enquiryRouter);
router.use('/enquiry', enquiryRouter);
router.use('/qrcodes', qrCodeRouter);
router.use('/qrcode', qrCodeRouter);
router.use('/uploads', uploadRouter);
router.use('/upload', uploadRouter);

export default router;
