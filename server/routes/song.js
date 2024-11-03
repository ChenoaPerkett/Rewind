const express = require('express');
const { addSong, getSongs, updateSong, deleteSong } = require('../controllers/song');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, getSongs);
router.post('/', auth, addSong);
router.put('/:id', auth, updateSong);
router.delete('/:id', auth, deleteSong);

module.exports = router;
