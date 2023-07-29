const express = require('express');
const passport =require('passport')
const router = express.Router();
const adminController = require('../controller/admin_controller')

router.get('/',passport.checkAdmin,passport.setAuthenticatedUser,adminController.home);
router.post('/performance-review',adminController.createPerformance)
router.get('/performance-page',adminController.getPerformance)
router.get('/feedback',adminController.getFeedback)
router.post('/performance-edit',adminController.updatePerformance)
router.post('/assign-to',adminController.assign)
router.post('/make-admin',adminController.makeAdmin)
module.exports = router;