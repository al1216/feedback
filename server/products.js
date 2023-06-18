const mongoose = require("mongoose");

const Product = mongoose.model("Product",{
    name: String,
    category: Array,
    logoUrl: String,
    linkProduct: String,
    desc: String,
    upvotesCount: Number,
    comments: Array
})

module.exports = Product;