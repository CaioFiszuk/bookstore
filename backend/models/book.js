const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: true
  },
  publishedYear: {
    type: String,
    required: true,
  },
  isbn: { 
    type: String, 
    unique: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  sold: { 
    type: Number, 
    default: 0 
  },
  ratings: [{ 
    user: mongoose.Schema.Types.ObjectId, 
    rating: Number 
  }],
  coverImage: { 
    type: String 
  },
  description: {
    type: String,
    required: true,
  },
  avaliableCopies: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('book', bookSchema);