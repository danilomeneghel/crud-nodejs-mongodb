const customer = require('../controllers/customer'),
    user = require('../controllers/user')

module.exports = (app) => {

    app.route('/customers')
        .get(user.isLoggedIn, customer.customerList)

    app.route('/customer-add')
        .get(user.isLoggedIn, customer.pageAdd)
        .post(user.isLoggedIn, customer.customerAdd)

    app.route('/customer-edit/:id')
        .get(user.isLoggedIn, customer.pageEdit)
        .post(user.isLoggedIn, customer.customerEdit)

    app.route('/customer-delete/:id')
        .get(user.isLoggedIn, customer.customerDelete)

    return app
}