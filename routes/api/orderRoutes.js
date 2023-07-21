import express from 'express';
import { getOrders, newOrder } from '../../controllers/orderController.js';

const router = express.Router();

router.route('/pedidos')
    .post(newOrder)
    .get(getOrders);

export default router;