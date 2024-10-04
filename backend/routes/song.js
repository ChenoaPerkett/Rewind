const express = require('express');
const { addSong, getSongs } = require('../controllers/songController');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', auth, addSong);
router.get('/', getSongs);

module.exports = router;
