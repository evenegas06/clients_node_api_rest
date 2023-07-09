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

/**
 * Get all clients from database.
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 * @param {Function} next 
 */
export const getClients = async (request, response, next) => {
    try {
        const clients = await Client.find();

        //TODO: message when empty...
        response.json(clients);
    } catch (error) {
        console.error(error);
        next();
    }
};

/**
 * Get client by id from database.
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 * @param {Function} next 
 */
export const getClientById = async (request, response, next) => {
    try {
        const client = await Client.findById(request.params.client_id);

        if (!client) {
            response.json({
                message: 'El id solicitado no existe.'
            });

            next();
        }
        response.json(client);
    } catch (error) {
        // console.error(error);
        next();
    }
};

/**
 * Update specific client.
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 * @param {Function} next 
 */
export const updateClient = async (request, response, next) => {
    const client_id = request.params.client_id;
    const body = request.body;

    try {
        const client = await Client.findByIdAndUpdate(client_id, body, {
            new: true,
        });

        response.json(client);
    } catch (error) {
        console.error(error);
        next();
    }
};