const express = require('express');
const passport =require('passport')
const router = express.Router();
const employeeController = require('../controller/employee_controller')

router.get('/',passport.checkAuthentication,employeeController.home);
router.get('/feedback',passport.checkAuthentication,employeeController.feedback);
router.post('/create-feedback',passport.checkAuthentication,employeeController.createFeedback);
module.exports = router;