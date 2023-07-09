import express from 'express';
import Product from '../models/Product.js';

/**
 * Store a new product in database.
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 * @param {Function} next 
 */
export const newProduct = async (request, response, next) => {
    const product = new Product(request.body);

    try {
        await product.save();

        response.json({
            message: 'Producto creado con éxito.'
        });
    } catch (error) {
        console.error(error);
        next();
    }
};