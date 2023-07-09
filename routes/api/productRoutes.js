import express from 'express';
import {
    newProduct
} from '../../controllers/productController.js';

const router = express.Router();

router.route('/productos')
    .post(newProduct);

export default router;