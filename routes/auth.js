const router = require('express').Router();
const User = require('../models/User');
const userController = require('../controllers/User');
const CryptoJS = require('crypto-js');
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const multerGoogleStorage = require('multer-google-storage');
const { verifyTokenAndAuthorization } = require('../libs/verifyToken');

const uploadHandler = multer({
  storage: multerGoogleStorage.storageEngine({keyFilename: "hashingmart-f956639b6503.json", projectId: "hashingmart", bucket: "data_uploads_hm"})
})

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// registration route => POST
router.post('/sign-up', userController.postSignUp);

// login route => POST
router.post('/sign-in', userController.postSignIn);

// update profile photo => POST
router.post('/:id/update-pfp', uploadHandler.any(), userController.postUpdateProfilePhoto);

module.exports = router;