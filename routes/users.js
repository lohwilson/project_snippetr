const router = require('express').Router();
const userController = require('../controllers/userController');
const loginValidation = require('../validation/user');

// router.get('/protected', loginValidation, userController.protected);

router.get('/protected', loginValidation, (req, res)=> {
  res.send('hello user')
});

// router.get('/', userController.loginPage);
router.post('/signup', userController.createNewUser);
router.post('/login', userController.loginUser);



module.exports = router;
