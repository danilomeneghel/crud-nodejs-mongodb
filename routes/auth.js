var passport = require("passport"),
    User = require("../models/user"),
    LocalStrategy = require("passport-local");

module.exports = function(app){

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    app.route('/')
    .get((req, res) => {
        res.render("index"); 
    })
    .post(passport.authenticate("local", {
        successRedirect: "/users",
        failureRedirect: "/" 
    }), (req, res) => { });

    app.route('/logout')
    .get((req, res) => {
        req.logout();
        res.redirect("/");
    });

    app.get("/register", function(req, res) {
        res.render("register");
    });

    app.post("/register", function(req,res){
        User.register(new User({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username
            }), req.body.password, function(err, user){
            if(err){
                console.log(err);
                return res.render('register');
            }
            passport.authenticate("local")(req, res, function(){
            res.redirect("/"); 
            });
        });
    });

    return app;
}