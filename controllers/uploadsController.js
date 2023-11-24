const Product = require('../models/Product')
const {StatusCodes} = require('http-status-codes')
const path = require('path')
const CustomError = require('../errors')

const uploadProductImage = async(req,res) => {

    let productImage = req.files.image
    
    if(!req.files){
        throw new CustomError.BadRequestError('no file upload')
    }

    if (!productImage.mimetype.startsWith('image')) {
        throw new CustomError.BadRequestError('Please Upload Image');
      }

    const maxSize = 1024*1024

    if(!productImage.size > maxSize){
        throw new CustomError.BadRequestError('please upload image smaller than 1MB ')
    }

    
    const imagePath = path.join(__dirname,'../public/upload/'+`${productImage.name}`)
    
    await productImage.mv(imagePath)

    return res.status(StatusCodes.OK).json({ image: {src: `/upload/${productImage.name}`}})
    
}

module.exports = {
    uploadProductImage
}