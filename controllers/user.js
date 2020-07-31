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
    User.findOne({_id: ObjectId(req.params.id)})
    .then((user) => {
        user.setPassword(req.body.password, (err, user) => {
            if (err) return next(err)

            user.name = req.body.name
            user.email = req.body.email
            user.username = req.body.username
            user.save()

            res.redirect("/users")
        })
    })
}

exports.pageProfile = (req, res) => {
    User.find({_id: req.user.id})
    .exec((err, result) => {
        if (err) return res.send(err)
        
        res.render('profile', { data: result, message: {} })
    })
}

exports.editProfile = (req, res) => {
    User.findByIdAndUpdate(req.user.id, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username
        }
    }, (err, user) => {
        if (err) return res.render('profile', { message: req.flash('error', err) }) 
        
        user.setPassword(req.body.password, (err, user) => {
            if (err) return res.render('profile', { message: req.flash('error', err) }) 

            user.name = req.body.name
            user.email = req.body.email
            user.username = req.body.username
            user.save()
        })
    })
    .exec((err, result) => {
        if (err) return res.render('profile', { message: {'error': err} }) 
        
        res.render('profile', { data: [result], message: {'success': 'Profile updated success!'} })
    })
}

exports.userDelete = (req, res) => {
    User.deleteOne({_id: ObjectId(req.params.id)}, (err, results) => {
        if (err) return res.send(err)

        res.redirect('/users')
    })
}

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) return next()

    res.redirect("/")
}
