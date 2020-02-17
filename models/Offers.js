const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const offerSchema = new Schema({
  name: String,
  description: String,
  discount: Number,
  duration: Number,
  state: Boolean, //Para Maria, que se muestre en Maps o no pero siempre esté en BD 
  start: Date,
  positionlat: {type: String, default: 41},
  positionlng: {type: String, default: -3.79},
  type: {type: String, enum: ["restoration", "shopping"]},
  levelRequiered: Number,
  punctuationReward: Number,
  image: String,//Faltaria poner la hora de inicio
  qrCode: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('Offers', offerSchema);
module.exports = User;