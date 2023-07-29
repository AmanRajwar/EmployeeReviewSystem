const express = require('express');
const router = express.Router();
const authController = require('../controller/auth_controller')

router.get('/',authController.login );
router.use('/auth',require('./auth'));
router.use('/admin',require('./admin'));
router.use('/employee',require('./employee'));
// router.use('/interview', require('./interview'))/*  this route is used to create, and get INTERVIEWS  */
// router.use('/students', require('./students'));/*  this route is used to create, update, and get students  */
// router.use('/home',require('./home'));/*  renders the home page for students  */
module.exports = router;