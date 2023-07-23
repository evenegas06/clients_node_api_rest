import express from 'express';
import {
    deleteOrder,
    getOrderById,
    getOrders,
    newOrder,
    updateOrder
} from '../../controllers/orderController.js';

const router = express.Router();

router.route('/pedidos')
    .post(newOrder)
    .get(getOrders);

router.route('/pedidos/:order_id')
    .get(getOrderById)
    .put(updateOrder)
    .delete(deleteOrder);

export default router;