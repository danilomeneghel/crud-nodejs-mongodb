const Product = require("../models/product"),
    mongoose = require('mongoose')

var ObjectId = mongoose.Types.ObjectId

exports.productList = (req, res) => {
    Product.find()
    .exec((err, results) => {
        if (err) return console.log(err)

        res.render('products', { data: results })
    })
}

exports.pageAdd = (req, res) => {
    res.render("product-add")
}

exports.productAdd = (req, res) => {
    new Product(req.body)
    .save((err) => {
        if (err) return console.log(err)

        res.redirect('/products')
    })
}

exports.pageEdit = (req, res) => {
    Product.find({_id: ObjectId(req.params.id)})
    .exec((err, result) => {
        if (err) return res.send(err)
        
        res.render('product-edit', { data: result })
    })
}

exports.productEdit = (req, res) => {
    Product.updateOne({_id: ObjectId(req.params.id)}, {
        $set: {
            type: req.body.type,
            price: req.body.price,
            description: req.body.description
        }
    })
    .then(result => {
        if (!result) return res.render('product-edit', { message: {'error': result} }) 
        
        res.redirect('/products')
    })
}

exports.productDelete = (req, res) => {
    Product.deleteOne({_id: ObjectId(req.params.id)}, 
    (err) => {
        if (err) return res.send(err)

        res.redirect('/products')
    })
}
