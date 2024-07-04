const { Router } = require('express')
const jwt = require('jsonwebtoken')

class CustomRouter {
    constructor(){
        this.router = Router()
        this.setupRoutes()
    }

    getRouter(){
        return this.router
    }

    setupRoutes(){}

    applyMiddlewares(middlewares){
        return middlewares.map(middleware => async (...params) => {
            try{
                await middleware.apply(this, params)
            }catch(error){
                if (!params[1].headersSent) { // Verificar si aún no se han enviado los encabezados
                    params[1].status(500).json({ error: error.message }); // Enviar una respuesta JSON con el error
                }
            }
        })
    }

    sendSuccessResponse = (req, res, next) => {
        res.sendSuccess = data => res.send({status: 'success', data})
        res.sendServerError = error => res.send({status: 'error', message: error})
        res.sendUserError = error => res.send({status: 'error', message: error})
        next()
    }

    enforcePolicies = policies => (req, res, next) => {
        if(policies[0] === 'PUBLIC') return next()

        const authCookie = req.headers.cookie
        if(!authCookie) return res.send({status: 'error', message: 'User not authenticated or missing token.'})

        const token =  authCookie.split('=')[1];
        const user = jwt.verify(token, process.env.JWT_KEY)
        if(!policies.includes(user.user.role.toUpperCase())) return res.status(403).send({status: 'error', message: 'User without permissions'})
        req.user = user
        next()
    }

    setupGetRoute(path, policies, ...middlewares){
        this.router.get(path, this.enforcePolicies(policies), this.sendSuccessResponse, this.applyMiddlewares(middlewares))
    }

    setupPostRoute(path, policies, ...middlewares){
        this.router.post(path, this.enforcePolicies(policies), this.sendSuccessResponse, this.applyMiddlewares(middlewares))
    }

    setupPutRoute(path, policies, ...middlewares){
        this.router.put(path, this.enforcePolicies(policies), this.sendSuccessResponse, this.applyMiddlewares(middlewares))
    }

    setupDeleteRoute(path, policies, ...middlewares){
        this.router.delete(path, this.enforcePolicies(policies), this.sendSuccessResponse, this.applyMiddlewares(middlewares))
    }
}

module.exports = CustomRouter