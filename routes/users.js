const router = require('express').Router();
const userController = require('../controllers/userController');
const loginValidation = require('../validation/user');

router.get('/protected', loginValidation, userController.protected);
router.post('/signup', userController.createNewUser);
router.post('/login', userController.loginUser);

module.exports = router;
