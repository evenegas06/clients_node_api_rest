import mongoose, { Schema } from 'mongoose';

const product_schema = new Schema({
    name: {
        type: String,
        trim: true,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    image: {
        type: String,
    },
});

const Product = mongoose.model('Product', product_schema);

export default Product;