import express from 'express';
import Order from '../models/Order.js';

/**
 * Store a new order in database.
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 * @param {express.NextFunction} next 
 */
export const newOrder = async (request, response, next) => {
    const order = new Order(request.body);

    try {
        await order.save();

        response.status(201).json({
            message: 'Se ha creado un nuevo pedido.',
        });
    } catch (error) {
        console.error(error);
        next();
    }
};

/**
 * Get all orders from database.
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 * @param {express.NextFunction} next 
 */
export const getOrders = async (request, response, next) => {
    try {
        const orders = await Order.find({})
            .populate('client_id')
            .populate({
                path: 'products.product_id',
                model: 'Product'
            });

        response.json(orders);
    } catch (error) {
        console.error(error);
        next();
    }
};

/**
 * Get order by id from database.
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 * @param {express.NextFunction} next 
 */
export const getOrderById = async (request, response, next) => {
    const order_id = request.params.order_id;

    try {
        const order = await Order.findById(order_id)
            .populate('client_id')
            .populate({
                path: 'products.product_id',
                model: 'Product'
            });

        if (!order) {
            response.json({
                message: `El pedido con id: ${order_id} no existe.`
            });

            return next();
        }

        response.json(order);
    } catch (error) {
        console.error(error);
        next();
    }
};

/**
 * Update specific order.
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 * @param {express.NextFunction} next 
 */
export const updateOrder = async (request, response, next) => {
    try {
        const order = await Order.findByIdAndUpdate({ _id: request.params.order_id }, request.body, {
            new: true
        });

        response.json(order);
    } catch (error) {
        console.error(error);
        next();
    }
};