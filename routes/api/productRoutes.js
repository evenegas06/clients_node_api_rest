import express from 'express';
import {
    getProductById,
    getProducts,
    newProduct,
    updateProduct,
    uploadFile
} from '../../controllers/productController.js';

const router = express.Router();

router.route('/productos')
    .post(uploadFile, newProduct)
    .get(getProducts);

router.route('/productos/:product_id')
    .get(getProductById)
    .put(uploadFile, updateProduct);

export default router;