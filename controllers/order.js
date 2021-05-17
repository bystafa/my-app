const Order = require('../models/Order')
const User = require('../models/User')
const Product = require('../models/Product')
const errorHandler = require('../utils/errorHandler')

module.exports.create = async function(req,res) {
    try {
        const maxOrder = await Order.findOne({user: req.user.id}).sort({date: -1})
        const order = new Order({
            user: req.user.id,
            products: req.body.products,
            order: maxOrder ? maxOrder.order + 1 : 1,
            address: req.body.address,
            index: req.body.index,
            phone: req.body.phone
        })
        const user = await User.findOneAndUpdate(
            {_id: req.user.id},
            {$set: {productsInBasket: []}},
            {new: true}
        )
        // req.body.products.forEach((elem) => {
        //     const product = await Product.findOneAndUpdate(
        //         {id: elem.id},
        //         {$set: {quantity: quantity - elem.quantity}},
        //         {new: true}
        //     )
        //     product.save()
        // })
        user.save()
        order.save()
        res.status(200).json(order)
    } catch (e) {
        errorHandler(res, e)
    }
}


module.exports.getById = async function(req,res) {
    try {
        const orders = await Order.find({user: req.user.id})
        res.status(200).json(orders)
    } catch (e) {
        errorHandler(res, e)
    }
}