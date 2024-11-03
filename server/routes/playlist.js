const express = require('express');
const { createPlaylist, getPlaylistsFeed, getPlaylist, deletePlaylist } = require('../controllers/playlist');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/:id', auth, getPlaylist);
router.post('/', auth, createPlaylist);
router.get('/:id/user', auth, getPlaylistsFeed);
router.delete('/:id', auth, deletePlaylist);

module.exports = router;
