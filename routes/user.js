var passport = require("passport"),
    User = require("../models/user"),
    mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId;

module.exports = function(app){

    app.route('/users')
    .get(isLoggedIn, (req, res) => {
        User.find().exec((err, results) => {
            if (err) return console.log(err)

            res.render('users', { data: results })
        })
    });

    app.route('/user-add')
    .get(isLoggedIn, (req, res) => {
        res.render("user-add"); 
    })
    .post(isLoggedIn, (req, res) => {
        User.register(new User({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username
            }), req.body.password, function(err, user){
            if(err){
                console.log(err);
                return res.render('add');
            }
            passport.authenticate("local")(req, res, function(){
                console.log('Add register success!')
                res.redirect("/users"); 
            });
        });    
    });

    app.route('/user-edit/:id')
    .get(isLoggedIn, (req, res) => {
        var id = req.params.id

        User.find({_id: ObjectId(id)}).exec((err, result) => {
            if (err) return res.send(err)
            
            res.render('user-edit', { data: result })
        })
    })
    .post(isLoggedIn, (req, res) => {
        var id = req.params.id
        var name = req.body.name
        var email = req.body.email
        var username = req.body.username
        
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
            });
        })
    });

    app.route('/user-delete/:id')
    .get(isLoggedIn, (req, res) => {
        var id = req.params.id

        User.deleteOne({_id: ObjectId(id)}, (err, results) => {
            if (err) return res.send(err)

            console.log('Delete register success!')        
            res.redirect('/users')
        })
    });

    function isLoggedIn(req,res,next) {
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/");
    }

    return app;
}