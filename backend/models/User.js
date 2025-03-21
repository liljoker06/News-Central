const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  history: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ArticleHistory', 
  }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;