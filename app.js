const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const bookRoutes = require('./api/routes/books') //targetujemy 
const libraryRoutes = require('./api/routes/library')

mongoose.connect('mongodb+srv://unth:'+ process.env.MONGO_ATLAS_PW +'@cluster0-p224k.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// ROutes
app.use('/books', bookRoutes); //wszystko co ma /books trafi do folderu
app.use('/library', libraryRoutes);


////////errors//////////

// nie znaleziono routa
app.use((req, res, next) => {
    const error = new Error('Nie znaleziono');
    error.status = 404;
    next(error);
})

//
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});


module.exports = app;