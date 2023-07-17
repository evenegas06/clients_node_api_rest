import express from 'express';
import Product from '../models/Product.js';

import multer from "multer";
import shortid from "shortid";

const multer_configuration = {
    storage: multer.diskStorage({
        destination: (request, file, cb) => {
            cb(null, '../../uploads');
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
        // if (request.file.filename) {
        //     product.image = request.file.filename;
        // }
        
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