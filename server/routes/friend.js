const express = require('express');
const auth = require('../middleware/auth');
const { getFriends, getFollowStatus, followUser, unfollowUser } = require('../controllers/friend');

const router = express.Router();

router.get('/:id/friends', auth, getFriends);
router.post('/:id/follow', auth, followUser);
router.post('/:id/unfollow', auth, unfollowUser);
router.get('/:id/follow-status', auth, getFollowStatus);

module.exports = router;