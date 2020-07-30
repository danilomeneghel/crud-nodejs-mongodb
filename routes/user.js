const user = require('../controllers/user')

module.exports = (app) => {

    app.route('/users')
        .get(user.isLoggedIn, user.list)

    app.route('/user-add')
        .get(user.isLoggedIn, user.getAdd)
        .post(user.isLoggedIn, user.postAdd)

    app.route('/user-edit/:id')
        .get(user.isLoggedIn, user.getEdit)
        .post(user.isLoggedIn, user.postEdit)

    app.route('/user-delete/:id')
        .get(user.isLoggedIn, user.delete)

    return app
}