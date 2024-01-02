import express from 'express';
import {
    deleteProduct,
    getProductById,
    getProducts,
    newProduct,
    searchProduct,
    updateProduct,
    uploadFile
} from '../../controllers/productController.js';

const router = express.Router();

router.route('/productos')
    .post(uploadFile, newProduct)
    .get(getProducts);

router.route('/productos/:product_id')
    .get(getProductById)
    .put(uploadFile, updateProduct)
    .delete(deleteProduct);

router.route('/productos/busqueda/:query')
    .post(searchProduct);

export default router;