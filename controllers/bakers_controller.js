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
        .populate({
            path:'breads',
            options: { limit: 5 }
        })
        .then(foundBakers => {
            res.render('bakerShow', {
                baker: foundBakers
            })
        })
})

//data seed
baker.get('/data/seed', async (req, res) => {
    await Baker.deleteMany();
    Baker.insertMany(bakerSeedData)
        .then(res.redirect('/breads'))
})

//delete
baker.delete('/:id', (req, res) => {
    Baker.findByIdAndDelete(req.params.id)
        .then(deleteBaker => {
            res.status(303).redirect('/breads')
        })
})

module.exports = baker