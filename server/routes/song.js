const express = require('express');
const { addSong, getSongs, updateSong, deleteSong, addToPlaylist, removeFromPlaylist } = require('../controllers/song');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, getSongs);
router.post('/', auth, addSong);
router.put('/:id', auth, updateSong);
router.delete('/:id', auth, deleteSong);
router.put('/:id/playlist/:pid', auth, addToPlaylist);
router.delete('/:id/playlist/:pid', auth, removeFromPlaylist);

module.exports = router;
