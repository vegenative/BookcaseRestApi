const mongoose = require('mongoose');

const productShema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    author: String,
    price: Number

});

module.exports = mongoose.model('Product',productShema);