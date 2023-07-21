import mongoose, { Schema } from 'mongoose';

const order_schema = new Schema({
    client_id: {
        type: Schema.ObjectId,
        ref: 'Client',
    },
    products: [{
        product_id: {
            type: Schema.ObjectId,
            ref: 'Product',
        },
        amount: Number,
    }],
    total: {
        type: Number,
    },
});

const Order = mongoose.model('Order', order_schema);

export default Order;