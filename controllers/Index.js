const sgMail = require('@sendgrid/mail');
const User = require('../models/User');

// Sendgrid API
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// GET
exports.getAllUserCount = async (req, res, next) => {
  try {
    const allUsers = await User.find().sort({ createdAt:-1 });
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};