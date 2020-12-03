const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', userController.loginPage);
router.post('/signup', userController.createNewUser);
router.post('/login', userController.loginUser);

module.exports = router;
