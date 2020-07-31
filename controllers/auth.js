const passport = require("passport"),
    User = require("../models/user"),
    LocalStrategy = require("passport-local")

exports.index = (req, res) => {
    res.render("index", { message: req.flash() })
}

exports.login = (req, res, next) => { 
    passport.use(new LocalStrategy(User.authenticate()))
    passport.serializeUser(User.serializeUser())
    passport.deserializeUser(User.deserializeUser())

    passport.authenticate("local", {
        successRedirect: "/users",
        failureRedirect: "/",
        failureFlash: "Username or Password invalid"
    })(req, res, next)
}

exports.logout = (req, res) => {
    req.logout()
    res.redirect("/")
}

exports.pageRegister = (req, res) => {
    res.render("register", { message: req.flash() })
}

exports.addRegister = (req,res) => {
    User.register(new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username
    }), req.body.password, 
    (err, user) => {
        if(err) return res.render('register', { message: {error: err.message} })

        passport.authenticate("local")(req, res, function(){
            res.render("index", { message: {success: 'User successfully registered!'} })
        })
    })
}
