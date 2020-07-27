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
        res.render("index", { message: req.flash() }); 
    })
    .post(passport.authenticate("local", {
        successRedirect: "/users",
        failureRedirect: "/",
        failureFlash: "Username or Password invalid"
    }),
    (req, res) => {
        res.render("index", { user: req.user }); 
    });

    app.get('*', function(req, res, next){
        res.locals.user = req.user || null;
        next();
    });
    
    app.route('/logout')
    .get((req, res) => {
        req.logout();
        res.redirect("/");
    });

    app.get("/register", function(req, res) {
        res.render("register", { message: req.flash() });
    });

    app.post("/register", function(req,res){
        User.register(new User({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username
            }), req.body.password, function(err, user){
            if(err) return res.render('register', { message: {error: err.message} });

            passport.authenticate("local")(req, res, function(){
                res.render("index", { message: {success: 'User successfully registered!'} }); 
            });
        });
    });

    return app;
}