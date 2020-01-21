const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Library = require('../models/bookcase');
const Book = require('../models/book');

//get
router.get('/', (req,res,next) => {
    Library.find()
    .select('book ammount _id')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        library: docs.map(doc => {
          return {
            _id: doc.id,
            book: doc.book,
            ammount: doc.ammount,
            request: {
              type:'GET',
              url: 'hhtp://localhost:3000/library/' + doc._id
            }
          }
        }),
        
      });
    })
    .catch(err =>{
      res.status(500).json({
        error:err
      });
    });
    
});

//post
router.post('/', (req,res,next) => {
    Book.findById(req.body.bookId)
    .then( book => {
      if (!book) {
        return res.status(404).json({
          message: "nie znaleziono takiego produktu"
        });
      }
      const library = new Library({
        _id: mongoose.Types.ObjectId(),
        book: req.body.bookId,
        genr: req.body.genr,
        ammount: req.body.ammount,
      });
      return library.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Biblioteka zachowana",
        createdLibrary: {
          _id: result._id,
          book: result.book,
          ammount: result.ammount,
          genr: req.body.genr
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/library/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
/////get 
    router.get("/:libraryId", (req, res, next) => {
        Library.findById(req.params.libraryId)
          .exec()
          .then(library => {
            if (!library) {
              return res.status(404).json({
                message: "Nie znaleziono biblioteki"
              });
            }
            res.status(200).json({
              library: library,
              request: {
                type: "GET",
                url: "http://localhost:3000/library"
              }
            });
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
      });
    // delete
      router.delete("/:libraryId", (req, res, next) => {
        Library.remove({ _id: req.params.libraryId })
          .exec()
          .then(result => {
            res.status(200).json({
              message: "Biblioteka usunięta",
              request: {
                type: "POST",
                url: "http://localhost:3000/library",
                body: { bookId: "ID", ammount: "Number", genr: "String"}
              }
            });
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
        });
    });
});

module.exports = router;