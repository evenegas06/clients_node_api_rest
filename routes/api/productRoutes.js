import express from 'express';
import {
    getProducts,
    newProduct,
    uploadFile
} from '../../controllers/productController.js';

const router = express.Router();

router.route('/productos')
    .post(uploadFile, newProduct)
    .get(getProducts);

export default router;