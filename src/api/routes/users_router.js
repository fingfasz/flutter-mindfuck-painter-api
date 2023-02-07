const express = require('express');
const router = express.Router();
const { createUser, loginUser, getUserByUUID, getUserByUsername } = require('../controllers/users_controller')

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/uuid/:uuid', getUserByUUID);
router.get('/:username', getUserByUsername);

module.exports = router;