const mongoose = require('mongoose');

const Customer = mongoose.model('Customer',{
    name: String,
    email: String,
    phone: Number,
    password: String
})

module.exports = Customer;