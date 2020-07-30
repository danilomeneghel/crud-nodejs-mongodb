const auth = require('../controllers/auth')

module.exports = (app) => {

    app.route('/')
        .get(auth.index)
        .post(auth.login)

    app.route('*')
        .get(auth.userLogged)
    
    app.route('/logout')
        .get(auth.logout)

    app.route('/register')
        .get(auth.getRegister)
        .post(auth.postRegister)

    return app
}