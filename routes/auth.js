const auth = require('../controllers/auth')

module.exports = (app) => {

    app.route('/')
        .get(auth.index)
        .post(auth.login)
    
    app.route('/logout')
        .get(auth.logout)

    app.route('/register')
        .get(auth.pageRegister)
        .post(auth.addRegister)

    return app
}