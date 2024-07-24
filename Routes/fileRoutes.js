const express = require('express');
const fileController = require('../controllers/fileController');

const router = express.Router();

router.post('/', fileController.createFile);
router.get('/:filename', fileController.readFile);
router.put('/', fileController.updateFile);
router.delete('/:filename', fileController.deleteFile);

module.exports = router;
