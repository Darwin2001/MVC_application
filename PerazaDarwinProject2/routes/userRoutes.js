const express = require('express');
const controller = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middlewares/auth');

const router = express.Router();

//send html for creating a new user account 
router.get('/new', isGuest, controller.new);

//create a new user account 
router.post('/', isGuest, controller.create);

//Send html for logging in
router.get('/login', isGuest, controller.getUserLogin);

//authenticate user login 
router.post('/login', isGuest, controller.login);

//Send user's profile page
router.get('/profile', isLoggedIn, controller.profile);

//POST /users/logout: logout a user
router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;