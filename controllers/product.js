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

module.exports.getByString = async function(req, res) {
    try {
        let regex = new RegExp(req.body.string);
        const products = await Product.find({name: regex})
        res.status(200).json(products) 
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
            {id: req.params.id},
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
        await Product.remove({id: req.params.id})
        res.status(200).json({
            message: 'Товар удален.'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.changeRating = async function(req, res) {
    try {
        let product = await Product.find({id: req.params.id})
        product[0].rating = {
            rating: (+req.body.rating + product[0].rating.rating * product[0].rating.quantity) / (product[0].rating.quantity + 1),
            quantity: ++product[0].rating.quantity
        }
        console.log(product)
        const result = await Product.updateOne({id: req.params.id},
            {$set: product[0]},
            {new: true})
        res.status(200).json(result)
    } catch (e) {
        errorHandler(res, e)
    }
}