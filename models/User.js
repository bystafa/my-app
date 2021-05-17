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
    }
})

module.exports = mongoose.model('users', userSchema)