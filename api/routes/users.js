const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user')

////////signup//////////
//post
router.post('/signup',(req,res,next)=>{
    User.find({email: req.body.email})
    .exec()
    .then( user =>{
        if(user.length >= 1){    // sprawdzamy czy konto o emailu już istnieje
            return res.status(409).json({
                message: 'Email już istnieje'
            })
        } else{
            bcrypt.hash(req.body.password, 10, (err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    });
                } else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                        });
                        user
                        .save()
                        .then(result => {
                            res.status(200).json({
                                message: 'Utworzono profil'
                            });
                        })
                        .catch(err =>{
                            console.log(err);
                            res.status(500).json({
                            error:err
                            });
                        });
                }
           
            });
        }
    })
    //delete
    router.delete('/:userId',(req,res,next)=>{
        User.remove({
             _id:req.params.userId
        })
        .exec()
        .then(result =>{
            res.status(200).json({
                message: 'Użytkownik został usunięty'
            });
        })
        .catch()
    })
    

});

///////login//////
router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Autoryzacja nieudana"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Autoryzacja nieudana"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              },
              process.env.JWT_KEY,
              {
                  expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Autoryzacja udana",
              token: token
            });
          }
          res.status(401).json({
            message: "Autoryzacja nieudana"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
module.exports = router;