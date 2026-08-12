import fs from 'fs/promises';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import logger from './utils/logger.js';

//import QRCode from './model/qrcode.model.js';
import Product from './model/product.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const qrCodeDataPath = path.join(__dirname, 'data', 'qrcode.json');
const productDataPath = path.join(__dirname, 'data', 'product.json');

export const seedDB = async () => {
  try {
    await connectDB();
    //const qrCodeData = JSON.parse(await fs.readFile(qrCodeDataPath, 'utf8'));
    const productData = JSON.parse(await fs.readFile(productDataPath, 'utf8'));

    // await QRCode.deleteMany();
    // await QRCode.insertMany(productDataPath);

    await Product.deleteMany();
    await Product.insertMany(productData);

    logger.info('Product seed completed', { insertedRecords: productData.length });
  } catch (err) {
    logger.error('Database seed failed', { err });
    console.log(err);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};
if (process.argv[1] === __filename) {
  seedDB();
}
