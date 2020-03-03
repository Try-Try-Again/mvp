const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const userProfileSchema = new mongoose.Schema({
  id: { type: String, index: true, unique: true },
  keys: Array,
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
