const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const { Schema } = mongoose

//Create Schema
const breadSchema = new Schema({
  name: { type: String, required: true },
  hasGluten: Boolean,
  image: { type: String, default: 'http://placehold.it/500x500.png' }
})

//Create Model
const Bread = mongoose.model('Bread', breadSchema);

//Export Model
module.exports = Bread