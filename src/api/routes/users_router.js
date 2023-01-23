const express = require('express');
const router = express.Router();
const { createUser, loginUser, getUser } = require('../controllers/users_controller')

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/:uuid', getUser);

module.exports = router;