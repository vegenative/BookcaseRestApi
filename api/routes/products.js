const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Book = require('../models/product');

//Get request
router.get('/', (req, res, next) => {
    Book.find()
    .exec()
    .then(docs =>{
        console.log(docs);
        if(docs.length >= 0){
            res.status(200).json(docs);
        }
        else {
            res.status(404).json({
                message: 'Zbiór książek jest pusty'
            })
        }
        res.status(200).json(docs);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});
// Post request
router.post('/', (req, res, next)=>{
    const product = new Book({
        _id: new mongoose.Types.ObjectId(), // unikatowe id
        title: req.body.title,
        author: req.body.author,
        price: req.body.price
    });
    product.save().then(result =>{
        console.log(result);
        res.status(201).json({
            message: "POST request to /products",
            createdProduct: result
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({              //pokazuje teraz błąd
            error:err
        });
    });
});
/////////////productID/////////////////////////////
//Get
router.get('/:productId', (req,res,next)=>{
    const id = req.params.productId;
    Book.findById(id)
    .exec()
    .then(doc =>{
        console.log('Z bazy danych',doc);
        res.status(200).json(doc);
        if(doc){
            res.status(200).json(doc);
        }
        else{
            res.status(404).json({message: 'Nie ma takiej książki o podanym ID'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err})
    });
});
//Patch
router.patch('/:productId', (req,res,next)=>{
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Book.update({_id:id}, {$set: updateOps})
    .exec()
    .then(res => {
        console.log(res)
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    })

});
// delete
router.delete('/:productId', (req,res,next)=>{
    const id = req.params.productId;
    Book.remove({
        _id:id
    })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        });
    });
 });

module.exports = router;