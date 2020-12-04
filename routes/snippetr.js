const router = require('express').Router();
const snippetrController = require('../controllers/snippetrController');
const loginValidation = require('../validation/user');

router.get('/', snippetrController.listAllSnippets);
router.delete('/:id', snippetrController.deleteSnippet);
router.put('/update/:id', snippetrController.updateSnippet);

router.put('/like', loginValidation, snippetrController.likeSnippet);
router.put('/unlike', loginValidation, snippetrController.unlikeSnippet);

router.post('/create', loginValidation, snippetrController.createSnippet);
router.get('/mysnippets', loginValidation, snippetrController.mySnippets);
router.get('/:id', snippetrController.listOneSnippet);

module.exports = router;
