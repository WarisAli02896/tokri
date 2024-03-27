//Defining routes
const auth = require('./customer/auth');
const shops = require('./shopkeeper/shops');
const shopKeeper = require('./shopkeeper/auth')

module.exports = {
    auth,
    shops,
    shopKeeper
}