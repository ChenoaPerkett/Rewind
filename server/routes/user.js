const express = require('express');
const auth = require('../middleware/auth');
const { getUser, updateUser } = require('../controllers/user');

const router = express.Router();

router.get('/:id', auth, getUser);
router.put('/:id', auth, updateUser);

module.exports = router;