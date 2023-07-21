import Order from '../models/Order.js'

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