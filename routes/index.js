const router = require('express').Router();
const User = require('../models/User');
const indexController = require('../controllers/Index');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// get all user count route => GET
router.get('/all-users-count', indexController.getAllUserCount);

module.exports = router;