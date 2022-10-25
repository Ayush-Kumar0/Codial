const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');

router.get('/', passport.checkAuthentication, usersController.users);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.get('/sign-out', usersController.destroySession);

//Creation of user
router.post('/create', usersController.create);

//Creating user's session
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in' }
), usersController.createSession);


module.exports = router;