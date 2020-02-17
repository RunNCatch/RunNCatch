const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  type: {type: String, enum: ["Offers", "Missions"]},
  description: String,
  tag: {type: String, enum: ["culture", "relax", "restoration", "shopping"]},
  discount: Number,
  start: Date,
  duration: Number,
  // positionlat: {type: String, default: 41},
  // positionlng: {type: String, default: -3.79},
  location: { type: { type: String }, coordinates: [Number] },
  levelRequiered: Number,
  punctuationReward: Number,
  image: String, //Faltaria poner la hora de inicio
  qrCode: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('Events', eventSchema);
module.exports = User;