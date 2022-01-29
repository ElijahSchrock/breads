const express = require('express');
const breads = express.Router();
const Bread = require('../models/bread');
const Baker = require('../models/baker');

//INDEX 
breads.get('/', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      Bread.find()
        .then(foundBread => {
          res.render('index', {
            breads: foundBread,
            bakers: foundBakers,
            title: 'Index Page'
          })
      })
  })
   .catch(err => {
    res.render('error404');
  })
})

//NEW
breads.get('/new', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      res.render('new', {
        bakers: foundBakers
      })
    })
})

  //EDIT
  breads.get('/:id/edit', (req, res) => {
    Baker.find()
      .then(foundBakers => {
        Bread.findById(req.params.id) 
          .then(foundBread => { 
            res.render('edit', {
              bread: foundBread,
              bakers: foundBakers
            })
          })
      })
  })
// SHOW
breads.get('/:id', (req, res) => {
  console.log('show route works')
  Bread.findById(req.params.id)
      .populate('baker')
      .then(foundBread => {
        const bakedBy = foundBread.getBakedBy()
        console.log(bakedBy)
          res.render('show', {
            bread: foundBread
          })
      })
      .catch(err => {
        res.render('error404');
        console.log('404')
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

  // UPDATE
  breads.put('/:id', (req, res) => {
    if(req.body.hasGluten === 'on'){
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
      .then(updatedBread => {
        console.log(updatedBread) 
        res.redirect(`/breads/${req.params.id}`) 
      })
  })

  // DELETE
  breads.delete('/:id', (req, res) => {
    Bread.findByIdAndDelete(req.params.id) 
      .then(deletedBread => { 
        res.status(303).redirect('/breads')
      })
  })
  
module.exports = breads