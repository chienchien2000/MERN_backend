const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()

const genneralAcessToken = async (payload) => {
    const acess_token = jwt.sign({
        ...payload 
    }, process.env.ACESS_TOKEN, { expiresIn: '30s' })

    return acess_token
}

const genneralRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({
        ...payload 
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })

    return refresh_token
}
const refreshTokenJWtService =  (token) => {  
    return new Promise( (resolve, reject) => {       
        try {
            console.log("token", token)
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {               
                if (err) {
                    resolve({
                        status: 'ERROR',
                        message:'The authentication'
                    })
                }
                const access_token =  await genneralRefreshToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                })
                console.log("access_token", access_token)
                resolve({
                    status:'OK',
                    message: ' SUCESS',
                    access_token
    
                })  
            })
                 
        } catch (e){
            reject(e)
        }
    })
}

module.exports = {
    genneralAcessToken,
    genneralRefreshToken,
    refreshTokenJWtService
}