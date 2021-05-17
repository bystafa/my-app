const express = require('express')
const authRoutes = require('./routes/auth')
const orderRoutes = require('./routes/order')
const productRoutes = require('./routes/product')
const userRoutes = require('./routes/user')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const passport = require('passport')

mongoose.connect(keys.mongoURI)
    .then(()=> {
        console.log('MongoDB connected.')
    })
    .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/user', userRoutes)

module.exports = app