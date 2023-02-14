const express = require('express');
const router = express.Router();
const { heartbeat } = require('../controllers/root_controller');

router.get('/heartbeat', heartbeat);

module.exports = router;