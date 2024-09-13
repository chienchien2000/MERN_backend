const userRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const routes = (app) =>{
    app.use('/api/user', userRouter)
    app.use('/api/product', ProductRouter)
}
module.exports = routes