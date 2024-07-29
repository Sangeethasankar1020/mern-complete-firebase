// routes/fileRoutes.js
const express = require('express');
const { uploadFile } = require('../controller/fileController');

const router = express.Router();

router.post('/', uploadFile);

module.exports = router;
