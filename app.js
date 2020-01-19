const express = require('express');
const app = express();
const morgan = require('morgan');

const productRoutes = require('./api/routes/products') //targetujemy 
const orderRoutes = require('./api/routes/orders')

app.use(morgan('dev'));

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
    res.status(err.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});


module.exports = app;