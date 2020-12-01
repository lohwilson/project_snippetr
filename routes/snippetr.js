const router = require('express').Router();
const snippetrController = require('../controllers/snippetrController');




router.get('/', snippetrController.listAllSnippets);
router.delete('/:id', snippetrController.deleteSnippet);
router.put('/update/:id', snippetrController.updateSnippet)
router.post('/create', snippetrController.createSnippet);
router.get('/:id', snippetrController.listOneSnippet)

module.exports = router;
