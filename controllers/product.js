const Product = require('../models/Product')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req,res) {
    try {
        const products = await Product.find()
        res.status(200).json(products) 
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getAllByCategory = async function(req,res) {
    try {
        const products = await Product.find({category: req.body.category})
        res.status(200).json(products) 
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function(req,res) {
    try {
        const product = await Product.findOne({id: req.params.id})
        res.status(200).json(product)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function(req,res) {
    const maxId = await Product.findOne().sort({id: -1})
    const product = new Product({
        id: maxId ? maxId.id + 1 : 1,
        name: req.body.name,
        // user: req.user.id,
        imageSrc: req.file ? req.file.path : '',
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category
    })
    try {
        await product.save()
        res.status(201).json(product)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.change = async function(req,res) {
    const updated = {
        name: req.body.name,
        user: req.user.id,
        price: req.body.price,
        quantity: req.body.quantity
    }
    if (req.file) updated.imageSrc = req.file.path
    try {
        const product = await Product.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(product)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.delete = async function(req,res) {
    try {
        await Product.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Товар удален.'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}