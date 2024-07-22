const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const ensureAuthenticated = require('../middleware/authMiddleware'); 
const upload = require('../config/multer');

router.post('/upload', ensureAuthenticated, upload.single('file'), fileController.uploadFile)

module.exports = router;