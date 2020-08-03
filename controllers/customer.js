const Customer = require("../models/customer"),
    mongoose = require('mongoose')

var ObjectId = mongoose.Types.ObjectId

exports.customerList = (req, res) => {
    Customer.find()
    .exec((err, results) => {
        if (err) return res.send(err)

        res.render('customers', { data: results })
    })
}

exports.pageAdd = (req, res) => {
    res.render("customer-add", { message: {} })
}

exports.customerAdd = (req, res) => {
    Customer.create(req.body)
    .then((result) => {
        if (!result) return res.render('customer-add', { message: {'error': result} }) 

        res.redirect('/customers')
    })
}

exports.pageEdit = (req, res) => {
    Customer.find({_id: ObjectId(req.params.id)})
    .exec((err, result) => {
        if (err) return res.send(err)
        
        res.render('customer-edit', { data: result, message: {} })
    })
}

exports.customerEdit = (req, res) => {
    Customer.updateOne({_id: ObjectId(req.params.id)}, {
        $set: {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        }
    })
    .then((result) => {
        if (!result) return res.render('customer-edit', { message: {'error': result} }) 
        
        res.redirect('/customers')
    })
}

exports.customerDelete = (req, res) => {
    Customer.deleteOne({_id: ObjectId(req.params.id)}, 
    (err) => {
        if (err) return res.send(err)

        res.redirect('/customers')
    })
}
