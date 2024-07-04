const CustomRouter = require('./CustomRouter')
const cartController = require('../controllers/carts.controller')

class CustomCartRouter extends CustomRouter {
    setupRoutes(){
        this.setupGetRoute('/:cid', ['PUBLIC'], async (req, res) => {
            try {
                const payload = await cartController.fetchById(req, res)
                res.sendSuccess(payload)
            } catch (error) {
                res.sendServerError(error.message)
            }
        })

        this.setupPostRoute('/', ['PUBLIC'], async (req, res) => {
            try {
                res.sendSuccess(await cartController.createNew(req, res))
            } catch (error) {
                res.sendServerError(error.message)
            }
        })

        this.setupPostRoute('/:cid/products/:pid', ['USER', 'PREMIUM'], async (req, res) => {
            try {
                res.sendSuccess(await cartController.addToCart(req, res))
            } catch (error) {
                res.sendServerError(error.message)
            }
        })

        this.setupPutRoute('/:cid', ['PUBLIC'], async (req, res) => {
            try {
                res.sendSuccess(await cartController.updateCart(req, res))
            } catch (error) {
                res.sendServerError(error.message)
            }
        })

        this.setupPutRoute('/:cid/products/:pid', ['PUBLIC'], async (req, res) => {
            try {
                res.sendSuccess(await cartController.updateCartItemQuantity(req, res))
            } catch (error) {
                res.sendServerError(error.message)
            }
        })

        this.setupDeleteRoute('/:cid/products/:pid', ['PUBLIC'], async (req, res) => {
            try {
                res.sendSuccess(await cartController.removeProductFromCart(req, res))
            } catch (error) {
                res.sendServerError(error.message)
            }
        })

        this.setupDeleteRoute('/:cid', ['PUBLIC'], async (req, res) => {
            try {
                res.sendSuccess(await cartController.removeAllProductsFromCart(req, res))
            } catch (error) {
                res.sendServerError(error.message)
            }
        })

        this.setupGetRoute('/:cid/purchase', ['PUBLIC'], async (req, res) => {
            try {
                res.sendSuccess(await cartController.processPurchase(req, res))
            } catch (error) {
                res.sendServerError(error.message)
            }
        })
    }
}

module.exports = CustomCartRouter;