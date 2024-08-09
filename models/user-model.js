const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/app')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

const userSchema = mongoose.Schema({
  username: String,
  role: String,
  email: String,
  password: String,
  image: String,
  bio: String
});

// Define a model
module.exports = mongoose.model('user', userSchema);