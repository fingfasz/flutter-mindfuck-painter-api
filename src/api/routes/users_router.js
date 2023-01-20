const express = require('express');
const router = express.Router();
const createUser = require('../controllers/users_controller')

router.post('/register', createUser);
// router.post('/login', loginUser);
// router.get('/:id', getUser);

module.exports = router;