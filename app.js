const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products') //targetujemy 
const orderRoutes = require('./api/routes/orders')

mongoose.connect('mongodb+srv://unth:'+ process.env.MONGO_ATLAS_PW +'@cluster0-p224k.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// ROutes
app.use('/products', productRoutes); //wszystko co ma /products trafi do folderu
app.use('/orders', orderRoutes);


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