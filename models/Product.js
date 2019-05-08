const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const ProductSchema =new Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
   gender: {
       type: String,
       required: true
   },
   type: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    inCart: {
        type: Boolean,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    date:{
        type:Date,
        default:Date.now
    }
});


module.exports = mongoose.model('products', ProductSchema);

