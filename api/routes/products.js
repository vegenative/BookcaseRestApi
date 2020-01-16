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
    res.status(201).json({
        message: "POST request to /products"
    })
});
/////////////productID/////////////////////////////
//Get
router.get('/:productId', (req,res,next)=>{
    const id = req.params.productId;
    if(id === 'special'){
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You have an ID'
        });
    }
});
//Patch
router.patch('/:productId', (req,res,next)=>{
   res.status(200).json({
       message:"Update product!"
   });
});
// delete
router.delete('/:productId', (req,res,next)=>{
    res.status(200).json({
        message:"deleted product!"
    });
 });

module.exports = router;