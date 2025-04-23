const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: { 
    type: String 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: props => `${props.value} is not a valid email`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  phone: { 
    type: String 
  },
  addresses: [{
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  }],
  cart: [{
    book: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'book' 
    },
    quantity: {
       type: Number, 
      default: 1 
    }
  }],
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'order'
  }],
  isAdmin: { 
    type: Boolean, 
    default: false 
  }
});

module.exports = mongoose.model('user', userSchema);