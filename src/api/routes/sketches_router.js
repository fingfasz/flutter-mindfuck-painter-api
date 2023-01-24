const express = require('express');
const router = express.Router();
const { createSketch } = require('../controllers/sketches_controller');

router.post('/create', createSketch);

module.exports = router;