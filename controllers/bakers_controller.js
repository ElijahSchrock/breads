const express = require('express');
const baker = express.Router();
const Baker = require('../models/baker');
const bakerSeedData = require('../models/baker_seed');

//index
baker.get('/', (req, res) => {
    Baker.find()
    .populate('breads')
        .then(foundBakers => {
            res.send(foundBakers)
        })
})

//show
baker.get('/:id', (req, res) => {
    Baker.findById(req.params.id)
        .populate('breads')
        .then(foundBakers => {
            res.render('bakerShow', {
                baker: foundBakers
            })
        })
})

//data seed
baker.get('/data/seed', (req, res) => {
    Baker.insertMany(bakerSeedData)
        .then(res.redirect('/breads'))
})

module.exports = baker