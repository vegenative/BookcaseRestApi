const mongoose = require('mongoose');

const libraryShema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    book:{ type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
    genr:{type: String, require:true},
    ammount:{type: Number, default: 1},
    

});

module.exports = mongoose.model('Library',libraryShema);