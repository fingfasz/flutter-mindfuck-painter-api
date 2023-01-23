const express = require('express');
const router = express.Router();
const { addFriend, removeFriend } = require('../controllers/relationships_controller')

router.post('/add', addFriend);
router.post('/remove', removeFriend);
router.post('/block', () => {});
router.post('/unblock', () => {});
router.get('/:uuid', () => {});

module.exports = router;