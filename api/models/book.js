const mongoose = require('mongoose');

const bookShema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, require:true},
    author: {type: String, require:true},
    price: {type: Number, require:true}

});

module.exports = mongoose.model('Book',bookShema);