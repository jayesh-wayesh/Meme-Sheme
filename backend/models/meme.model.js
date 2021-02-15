const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memeSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  likes: {type: Number, required: true},
  image: {type: String, required: true}
}, {
  timestamps: true,
});

const Meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;