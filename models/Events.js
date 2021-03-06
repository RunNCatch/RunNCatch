const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  type: {type: String, enum: ["Offers", "Missions"]},
  description: String,
  tag: {type: String, enum: ["culture", "relax", "restoration", "shopping", "beauty"]},
  discount: Number,
  start: Date,
  duration: Number,
  location: { type: { type: String }, coordinates: [Number] },
  levelRequiered: Number,
  punctuationReward: Number,
  image: String,
  qrCode: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('Events', eventSchema);
module.exports = User;