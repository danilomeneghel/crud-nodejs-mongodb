var passport = require("passport"),
    User = require("../models/user"),
    mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId

exports.list = (req, res) => {
    User.find().exec((err, results) => {
        if (err) return console.log(err)

        res.render('users', { data: results })
    })
}

exports.getAdd = (req, res) => {
    res.render("user-add")
}

exports.postAdd = (req, res) => {
    User.register(new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username
        }), req.body.password, function(err, user){
        if(err) return res.render('user-add')

        passport.authenticate("local")(req, res, function(){
            console.log('Add register success!')
            res.redirect("/users")
        })
    })
}

exports.getEdit = (req, res) => {
    var id = req.params.id

    User.find({_id: ObjectId(id)}).exec((err, result) => {
        if (err) return res.send(err)
        
        res.render('user-edit', { data: result })
    })
}

exports.postEdit = (req, res) => {
    var id = req.params.id,
    name = req.body.name,
    email = req.body.email,
    username = req.body.username
    
    User.updateOne({_id: ObjectId(id)}, {
        $set: {
            name: name,
            email: email,
            username: username
        }
    }, (err, result) => {
        if (err) return res.send(err)

        passport.authenticate("local")(req, res, function(){
            console.log('Edit register success!')
            res.redirect("/users")
        })
    })
}

exports.delete = (req, res) => {
    var id = req.params.id

    User.deleteOne({_id: ObjectId(id)}, (err, results) => {
        if (err) return res.send(err)

        console.log('Delete register success!')        
        res.redirect('/users')
    })
}

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) return next()

    res.redirect("/")
}
