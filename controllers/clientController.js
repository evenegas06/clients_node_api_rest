import Client from '../models/Client.js';
import express from 'express';

/**
 * Store a new client in database.
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 * @param {Function} next 
 */
export const newClient = async (request, response, next) => {
    const client = new Client(request.body);

    try {
        await client.save();
        
        response.status(201).json({
            message: 'Cliente creado con éxito.',
        });
    } catch (error) {
        console.error(error);
        next();
    }
};