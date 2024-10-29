const express = require('express');
const { createPlaylist, getPlaylists } = require('../controllers/playlist');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', auth, createPlaylist);
router.get('/', getPlaylists);

module.exports = router;
