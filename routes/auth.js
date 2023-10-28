const express = require('express');
const passport = require('passport');
const router = express.Router();

const authController = require('../controller/auth_controller');

router.post('/signup', authController.signup);
router.post('/signin', passport.authenticate('local', { failureRedirect: '/' }), authController.signin);
router.get('/sign-out', authController.destroySession);


router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), authController.signin);

module.exports = router;