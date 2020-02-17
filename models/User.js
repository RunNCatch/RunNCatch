const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Event = require("../models/Events");
const Offer = require("../models/Offers");

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  rol: {type: String, enum: ["Customer", "Admin"], default: "Customer"},
  punctuation: Number,
  level: Number,
  events: [{type: Schema.Types.ObjectId, ref: "Events"}],
  offers: [{type: Schema.Types.ObjectId, ref: "Offers"}]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
