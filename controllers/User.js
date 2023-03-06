const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// Sendgrid API
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// POST
exports.postSignUp = async (req, res, next) => {
  const firstName = req.body.firstName[0];
  const lastName = req.body.lastName[0];
  const email = req.body.email[0];
  const password = req.body.password[0];

  const newUser = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: CryptoJS.AES.encrypt(
      password,
      process.env.PASS_SEC
    ).toString()
  })

  try {
    const createdUser = await newUser.save();
    res.status(201).json(createdUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// POST SIGN IN
exports.postSignIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json('Wrong email provided');
    } 
    // !user && res.status(401).json('Wrong email provided')
    
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const userPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (userPassword !== req.body.password) {
      return res.status(401).json('Some error occured');
    }
    // userPassword !== req.body.password && res.status(401).json('Some error occured')

    const accessToken = jwt.sign({
      id: user._id,
    }, process.env.JWT_SEC, {expiresIn: "5d"});

    // do not send all information of the user
    const { password, ...others } = user._doc;
    res.status(200).json({...others, accessToken});
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
}