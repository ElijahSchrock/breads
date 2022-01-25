const express = require('express');
const breads = express.Router();
const Bread = require('../models/bread');

//INDEX 
breads.get('/', (req, res) => {
  console.log("Index route Works")
  Bread.find()
    .then(foundBreads => {
      res.render('index', {
        breads: foundBreads,
        title: 'Index Page'
      })
   })
   .catch(err => {
    res.render('error404');
  })
})

//NEW
breads.get('/new', (req, res) => {
    res.render('new');
})

  //EDIT
breads.get('/:indexArray/edit', (req, res) => {
    res.render('edit', {
      bread: Bread[req.params.indexArray],
      index: req.params.indexArray
    })
  })

// SHOW
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id.toString())
      .then(foundBread => {
          res.render('show', {
              bread: foundBread,
              index: id
          })
      })
      .catch(err => {
        res.render('error404');
      })
})

// CREATE
breads.post('/', (req, res) => {
  console.log('Create Bread')
  if(!req.body.image) {
      req.body.image = undefined 
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  res.redirect('/breads')
})


  // DELETE
breads.delete('/:indexArray', (req, res) => {
  Bread.splice(req.params.indexArray, 1)
  res.status(303).redirect('/breads')
})
  
  // UPDATE
  breads.put('/:arrayIndex', (req, res) => {
    if(req.body.hasGluten === 'on'){
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread[req.params.arrayIndex] = req.body
    res.redirect(`/breads/${req.params.arrayIndex}`)
  })
module.exports = breads