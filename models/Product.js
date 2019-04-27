const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const ProductSchema =new Schema ({
    productName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    }
});


module.exports = mongoose.model('products', ProductSchema);