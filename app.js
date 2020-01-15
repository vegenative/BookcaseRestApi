const express = require('express');
const app = express();

const productRoutes = require('./api/routes/products') //targetujemy 

app.use('/products', productRoutes); //wszystko co ma /products trafi do folderu
// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works'
//     });
// });

module.exports = app;