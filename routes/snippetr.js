const router = require('express').Router();
const snippetrController = require('../controllers/snippetrController');
const loginValidation = require('../validation/user');

router.get('/', snippetrController.listAllSnippets);
router.delete('/:id', snippetrController.deleteSnippet);
router.put('/update/:id', snippetrController.updateSnippet)
router.put('/likes', snippetrController.updateLikes);
router.post('/create', loginValidation, snippetrController.createSnippet);
router.get('/:id', snippetrController.listOneSnippet)

module.exports = router;
