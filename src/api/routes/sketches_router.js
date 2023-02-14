const express = require('express');
const router = express.Router();
const { createSketch, deleteSketch } = require('../controllers/sketches_controller');

router.post('/create', createSketch);
router.post('/delete', deleteSketch);

module.exports = router;