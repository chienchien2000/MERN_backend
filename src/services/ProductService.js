const Product = require("../models/ProductModel")

const createProduct = (newProduct) =>{
    return new Promise( async (resolve, reject) => {
        const {name, image,type, price, countInStock,rating,description  } = newProduct
        try{
            const checkProduct = await Product.findOne({
                name: name,
            })
            if(checkProduct !== null) {
                resolve({
                    status: 'OK',
                    message: 'This is name of product is aldready'
                })
            }

            const newProduct = await Product.create({
                name, 
                image,
                type, 
                price,
                 countInStock,
                 rating,
                 description
               
            }) 
            if(newProduct){
                resolve({
                    status:'OK',
                    message: 'SUCESS',
                    data: newProduct
                })
            }
        }catch (e){
            reject(e)
        }
    })
}
const updateProduct = (id, data,) =>{
    return new Promise( async (resolve, reject) => {       
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if(checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'This product is not defined'
                })
            }

            const updateProduct1 = await Product.findByIdAndUpdate(id, data,{new: true})
            resolve({
                status:'OK',
                message: 'SUCESS',
                data: updateProduct
            })

         
        } catch (e){
            reject(e)
        }
    })
    
}
const getDetailProduct = (id) =>{
    return new Promise( async (resolve, reject) => {       
        try {
            const product = await Product.findOne({
                _id: id
            })
            if(product === null) {
                resolve({
                    status: 'OK',
                    message: 'This Product is not defined'
                })
            }

            resolve({
                status:'OK',
                message: ' SUCESS',
                data: product
            })

         
        } catch (e){
            reject(e)
        }
    })
    
}
const deleteProduct = (id) =>{
    return new Promise( async (resolve, reject) => {       
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if(checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'This user is not defined'
                })
            }

            await Product.findByIdAndDelete(id)
            resolve({
                status:'OK',
                message: 'delete SUCESS',
            })        
        } catch (e){
            reject(e)
        }
    })
    
}

const getAllProduct = (limit  , page, sort, filter ) =>{
    // console.log('sort',sort)
    return new Promise( async (resolve, reject) => {       
        try {    
            const totalProduct = await Product.countDocuments() 
              if(filter){
                const label = filter[0];
                const allObjectFilter = await Product.find({ [label]: { '$regex': filter[1]}}).limit(limit).skip(page*limit)
                resolve({
                    status:'OK',
                    message: 'SUCESS',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),  
                    totalPage: Math.ceil(totalProduct / limit)             
                })
              }
              if(sort){
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status:'OK',
                    message: 'SUCESS',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),  
                    totalPage: Math.ceil(totalProduct / limit)             
                })
              }    
              const allProduct = await Product.find().limit(limit).skip(page * limit)
            
            resolve({
                status:'OK',
                message: 'SUCESS',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),  
                totalPage: Math.ceil(totalProduct / limit)             
            })
        } catch (e){
            reject(e)
        }
    })   
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct   
}