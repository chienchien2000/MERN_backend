const Productservice=require('../services/ProductService')


const createProduct = async (req,res ) => {
    try {
        const {name, image,type, price, countInStock,rating,description  } = req.body

        if (!name || !image || !type || !price || !countInStock  || !rating){
            return res.status(200).json({
                status:'ERR',
                message: 'The input is required'
            })
        } 

        const response = await Productservice.createProduct(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message:e
        })
    }
}
const updateProduct = async (req,res ) => {
    try {
        const productId = req.params.id
        const data = req.body
        if(!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        console.log('productId', productId)
        const response = await Productservice.updateProduct(productId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getDetailProduct = async (req,res ) => {
    try {
        const productId = req.params.id
        if(!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await Productservice.getDetailProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const deleteProduct = async (req,res ) => {
    try {
        const productId = req.params.id
        if(!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await Productservice.deleteProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getAllProduct = async (req,res ) => {

    try {
        const {limit,page,sort,filter} = req.query
        const response = await Productservice.getAllProduct(Number(limit)||8,Number(page)||0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct
}