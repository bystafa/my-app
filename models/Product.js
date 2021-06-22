const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    id: {
        type: Number,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    rating: {
        rating: Number,
        quantity: Number
    }
})

module.exports = mongoose.model('products', productSchema)