const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const { Schema } = mongoose

//Create Schema
const breadSchema = new Schema({
  name: { type: String, required: true },
    hasGluten: Boolean,
    image: { type: String, default: 'https://picsum.photos/500/500' },
  baker: {
    type: Schema.Types.ObjectId,
    ref: 'Baker'
  }
})

// helper methods 
breadSchema.methods.getBakedBy = function(){
  return `${this.name} was baked with love by ${this.baker.name}, who has been with us since ${this.baker.startDate}`
}

//Create Model
const Bread = mongoose.model('Bread', breadSchema);

//Export Model
module.exports = Bread