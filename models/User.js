const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profile_photo: { type: String, default: 'https://a0.muscache.com/defaults/user_pic-225x225.png?v=3' }
}, { timestamps: true })

module.exports = mongoose.model("User", UserSchema);