const express = require('express');
const router = express.Router();
const bodyParser=require('body-parser');
const passport = require('passport');
const User = require('../models/User');
const Product = require('../models/Product');


router.post('/', (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Create a Product
    const product = new Product({
        name: req.body.name || "No product title", 
        description: req.body.description,
        price: req.body.price,
        gender: req.body.gender,
        type: req.body.type,
        img: req.body.img,
        inCart: req.body.inCart,
        category: req.body.category
    });

    // Save Product in the database
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the product."
        });
    });
});


router.get('/', (req,res) =>{
    Product.find()
    .then(products => res.json(products))
    .catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving products."
        });
    });
});


router.post('/:productId',(req, res) => {
    Product.findById(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });            
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving product with id " + req.params.productId
        });
    });
});


router.put('/:productId',(req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Find and update product with the request body
    Product.findByIdAndUpdate(req.params.productId, {
        name: req.body.name || "No product title", 
        description: req.body.description,
        price: req.body.price,
        gender: req.body.gender,
        type: req.body.type,
        img: req.body.img,
        inCart: req.body.inCart,
        category: req.body.category
    }, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.productId
        });
    });
});

router.delete('/:productId', (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.productId
        });
    });
});
module.exports = router;