const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    products: [{
        id: {
            type: Number
        },
        quantity: {
            type: Number
        }
    }],
    date: {
        type: Date,
        default: Date.now
    },
    order: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    index: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('orders', orderSchema)