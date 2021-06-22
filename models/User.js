const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    productsInBasket: [
        {
            id: Number,
            quantity: Number
        }
    ],
    likedProducts: [
        {
            id: Number
        }
    ],
    userType: {
        type: String,
        required: true
    }, 
    rating: [
        {
            id: Number,
            rating: Number
        }
    ],
    city: {
        type: String
    },
    phone: {
        type: String
    },
    imageSrc: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('users', userSchema)