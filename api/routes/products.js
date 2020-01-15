const express = require('express');
const router = express.Router();

//Get request
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "GET request to /products"
    })
});
// Post request
router.post('/', (req, res, next)=>{
    res.status(200).json({
        message: "POST request to /products"
    })
});

module.exports = router;