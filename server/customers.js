const mongoose = require('mongoose');

const Customer = mongoose.model('Customer',{
    name: String,
    email: String,
    mobile: Number,
    password: String
})

module.exports = Customer;