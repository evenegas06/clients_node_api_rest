import express from 'express';
import { getOrderById, getOrders, newOrder } from '../../controllers/orderController.js';

const router = express.Router();

router.route('/pedidos')
    .post(newOrder)
    .get(getOrders);

router.route('/pedidos/:order_id')
    .get(getOrderById);

export default router;