const router = require('express').Router();
const snippetrController = require('../controllers/snippetrController');

const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
cloudinary.config({
  cloud_name: 'drfrooljx',
  api_key: '973489489432886',
  api_secret: 'cL0FCPAkulWttYHE7QoAJQM_PUI'
});


router.get('/', snippetrController.listAllSnippets);
router.delete('/:id', snippetrController.deleteSnippet);
router.put('/update/:id', snippetrController.updateSnippet)
router.post('/create', snippetrController.createSnippet);
router.get('/:id', snippetrController.listOneSnippet)

module.exports = router;
