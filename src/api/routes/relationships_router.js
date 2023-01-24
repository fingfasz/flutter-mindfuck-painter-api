const express = require('express');
const router = express.Router();
const { createRelationship, removeRelationship, getRelationships } = require('../controllers/relationships_controller')

router.post('/create', createRelationship);
router.post('/remove', removeRelationship);
router.post('/block', createRelationship);
router.post('/unblock', removeRelationship);
router.get('/:uuid', getRelationships);

module.exports = router;