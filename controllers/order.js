const Order = require("../models/order"),
    Customer = require("../models/customer"),
    Product = require("../models/product"),
    mongoose = require('mongoose'),
    async = require('async')

var ObjectId = mongoose.Types.ObjectId

exports.orderList = async (req, res) => {
    Order.find()
    .populate('customer')
    .populate('product')
    .exec((err, results) => {
        if (err) return res.send(err)

        res.render('orders', { data: results })
    })
}

exports.pageAdd = (req, res) => {
    async.parallel([
        function(callback) {
            Customer.find({}, function (err, rows1) {
                if (err) return callback(err)
                return callback(null, rows1)
            })
        },
        function(callback) {
            Product.find({}, function (err, rows2) {
                if (err) return callback(err)
                return callback(null, rows2)
            })
        }
    ], function(err, callbackResults) {
        if (err) return res.send(err)

        res.render('order-add', { customers: callbackResults[0], products: callbackResults[1], message: {} })
    })
}

exports.orderAdd = (req, res) => {
    Order.create(req.body)
    .then((result) => {
        if (!result) return res.render('order-add', { message: {'error': result} }) 

        res.redirect('/orders')
    })
}

exports.pageEdit = (req, res) => {
    async.parallel([
        function(callback) {
            Customer.find({}, function (err, rows1) {
                if (err) return callback(err)
                return callback(null, rows1)
            })
        },
        function(callback) {
            Product.find({}, function (err, rows2) {
                if (err) return callback(err)
                return callback(null, rows2)
            })
        },
        function(callback) {
            Order.find({_id: ObjectId(req.params.id)}, function (err, rows3) {
                if (err) return callback(err)
                return callback(null, rows3)
            })
            .populate('customer')
            .populate('product')
        }
    ], function(err, callbackResults) {
        if (err) return res.send(err)

        res.render('order-edit', { customers: callbackResults[0], products: callbackResults[1], data: callbackResults[2], message: {} })
    })
}

exports.orderEdit = (req, res) => {
    Order.updateOne({_id: ObjectId(req.params.id)}, {
        $set: {
            customer: req.body.customer,
            product: req.body.product,
            quantity: req.body.quantity,
            deliveryDate: req.body.deliveryDate,
            note: req.body.note
        }
    })
    .then((result) => {
        if (!result) return res.render('order-edit', { message: {'error': result} }) 
        
        res.redirect('/orders')
    })
}

exports.orderDelete = (req, res) => {
    Order.deleteOne({_id: ObjectId(req.params.id)}, 
    (err) => {
        if (err) return res.send(err)

        res.redirect('/orders')
    })
}
