const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')


module.exports.addProduct = async function(req,res) {
    const currentUser = await User.findOne({_id: req.user.id})

    if (currentUser.productsInBasket.filter((elem)=> elem.id === req.body.productsInBasket[0].id).length === 0) {
        // если товара нет
        currentUser.productsInBasket.push(req.body.productsInBasket[0])
    } else {
        //если товар есть, но ему надо изменить количество
        currentUser.productsInBasket.forEach((elem, index) => {
            if (elem.id === req.body.productsInBasket[0].id) {
                currentUser.productsInBasket[index].quantity = req.body.productsInBasket[0].quantity
            }
        }) 
    }

    const updated = {
        productsInBasket: currentUser.productsInBasket
    }
    try {
        const product = await User.findOneAndUpdate(
            {_id: req.user.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(product)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.deleteProduct = async function(req,res) {
    const currentUser = await User.findOne({_id: req.user.id})
    if (currentUser.productsInBasket.filter((elem)=> elem.id === req.body.productsInBasket[0].id).length !== 0) {
        const updated = {
            productsInBasket: currentUser.productsInBasket.filter((elem)=> elem.id !== req.body.productsInBasket[0].id)
        }
        try {
            const product = await User.findOneAndUpdate(
                {_id: req.user.id},
                {$set: updated},
                {new: true}
            )
            res.status(200).json(product)
        } catch (e) {
            errorHandler(res, e)
        }
    } else {
        res.status(200).json('Товара нет в корзине')
    }
}

module.exports.getInfo = async function(req,res) {
    try {
        const currentUser = await User.findOne({_id: req.user.id})
        res.status(200).json(currentUser)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.deleteAll = async function(req,res) {
    const updated = {
        productsInBasket: []
    }
    try {
        const product = await User.findOneAndUpdate(
            {_id: req.user.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(product)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.like = async function(req,res) {
    const currentUser = await User.findOne({_id: req.user.id})
    if (currentUser.likedProducts.find((elem) => elem.id === req.body.likedProducts[0].id)) {
        //если есть лайк
        currentUser.likedProducts = currentUser.likedProducts.filter((elem) => elem.id !== req.body.likedProducts[0].id)
    } else {
        //если нет
        currentUser.likedProducts.push(req.body.likedProducts[0])
    }
    const updated = {
        likedProducts: currentUser.likedProducts
    }
    try {
        const product = await User.findOneAndUpdate(
            {_id: req.user.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(product)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.changeRating = async function(req, res) {
    try {
        const currentUser = await User.findOne({_id: req.user.id})
        if (currentUser.rating) {
            let index = currentUser.rating.findIndex(el => el.id == req.body.id)
            if (index !== -1) {
                //если есть уже такой рейтинг
                currentUser.rating[index].rating = req.body.rating
            } else {
                //если нет
                currentUser.rating.push({
                    id: req.body.id,
                    rating: req.body.rating
                })
            }
        }
        const update = await User.updateOne(
            {_id: req.user.id},
            {$set: currentUser},
            {new: true}
        )
        res.status(200).json(update)
    } catch (e) {
        errorHandler(res, e)
    }
}