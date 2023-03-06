const router = require('express').Router();
const User = require('../models/User');
const userController = require('../controllers/User');
const CryptoJS = require('crypto-js');
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// registration route => POST
router.post('/sign-up', userController.postSignUp);

// login route => POST
router.post('/sign-in', userController.postSignIn);

module.exports = router;