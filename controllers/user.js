const passport = require("passport"),
    User = require("../models/user"),
    mongoose = require('mongoose')

var ObjectId = mongoose.Types.ObjectId

exports.userList = (req, res) => {
    User.find()
    .exec((err, results) => {
        if (err) return console.log(err)

        res.render('users', { data: results })
    })
}

exports.pageAdd = (req, res) => {
    res.render("user-add")
}

exports.userAdd = (req, res) => {
    User.register(new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username
    }), req.body.password, 
    (err, user) => {
        if(err) return res.render('user-add')

        res.redirect("/users")
    })
}

exports.pageEdit = (req, res) => {
    User.find({_id: ObjectId(req.params.id)}).exec((err, result) => {
        if (err) return res.send(err)
        
        res.render('user-edit', { data: result })
    })
}

exports.userEdit = (req, res) => {
    User.updateOne({_id: ObjectId(req.params.id)}, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }
    }, (err, user) => {
        if(err) return res.render('user-edit')

        res.redirect("/users")
    })
}

exports.pageProfile = (req, res) => {
    User.find({_id: ObjectId(res.locals.user.id)})
    .exec((err, result) => {
        if (err) return res.send(err)
        
        res.render('profile', { data: result })
    })
}

exports.editProfile = (req, res) => {
    User.updateOne({_id: ObjectId(res.locals.user.id)}, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }
    }, (err, user) => {
        if (err) return res.send(err)

        res.redirect("/profile")
    })
}

exports.userDelete = (req, res) => {
    User.deleteOne({_id: ObjectId(req.params.id)}, (err, results) => {
        if (err) return res.send(err)

        console.log('Delete register success!')        
        res.redirect('/users')
    })
}

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) return next()

    res.redirect("/")
}
