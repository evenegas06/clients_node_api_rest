import express from 'express';
import { resolve } from 'path';

import multer from "multer";
import shortid from "shortid";

import Product from '../models/Product.js';

// import path from 'path';
// import {fileURLToPath} from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const multer_configuration = {
    storage: multer.diskStorage({
        destination: (request, file, cb) => {
            // console.log(resolve('./uploads'));
            cb(null, resolve('./uploads'));
        },
        filename: (request, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        },
    }),
    fileFilter(request, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('El formato del archivo no es válido.'));
        }
    },
};

const upload = multer(multer_configuration).single('image');

/**
 * Upload file.
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 * @param {express.NextFunction} next 
 */
export const uploadFile = (request, response, next) => {
    upload(request, response, (error) => {
        if (error) {
            response.json({ message: error });
        }
        next();
    });
};

/**
 * Store a new product in database.
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 * @param {express.NextFunction} next 
 */
export const newProduct = async (request, response, next) => {
    const product = new Product(request.body);
    // console.log(request.body);

    try {
        if (request.file.filename) {
            product.image = request.file.filename;
        }

        await product.save();

        response.json({
            message: 'Producto creado con éxito.'
        });
    } catch (error) {
        console.error(error);
        next();
    }
};

/**
 * Get all products from database.
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 * @param {express.NextFunction} next 
 */
export const getProducts = async (request, response, next) => {
    try {
        const products = await Product.find({});
        response.json(products);
    } catch (error) {
        console.error(error);
    }
};

/**
 * Get product by id from database.
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 * @param {express.NextFunction} next 
 */
export const getProductById = async (request, response, next) => {
    const product = await Product.findById(request.params.product_id);

    if (!product) {
        response.json({
            message: 'Es producto que buscas no existe.'
        });
        return next();
    }
    response.json(product);
};

/**
 * Update specific product.
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 * @param {express.NextFunction} next 
 */
export const updateProduct = async (request, response, next) => {
    const product_id = request.params.product_id;
    const new_product = request.body;

    const product = await Product.findById(product_id);

    try {
        if (request.file) {
            new_product.image = request.file.filename;
        } else {
            new_product = product.image;
        }

        const update_product = await Product.findOneAndUpdate({ _id: product_id }, new_product, {
            new: true
        });

        response.json(update_product);
    } catch (error) {
        console.error(error);
        next();
    }
};