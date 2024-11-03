const express = require('express');
const { createPlaylist, getPlaylistsFeed } = require('../controllers/playlist');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', auth, createPlaylist);
router.get('/:id', getPlaylistsFeed);

module.exports = router;
