const express = require('express');
const auth = require('../middleware/auth');
const { getUser, getUsers, updateUser, getUserPlaylists, getUserSavedPlaylists } = require('../controllers/user');

const router = express.Router();

router.get('/', auth, getUsers);
router.get('/:id', auth, getUser);
router.put('/:id', auth, updateUser);
router.get('/:id/playlist', auth, getUserPlaylists);
router.get('/:id/saved', auth, getUserSavedPlaylists);

module.exports = router;