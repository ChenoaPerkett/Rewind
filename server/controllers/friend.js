const User = require('../models/User');

exports.getFriends = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('friends');
        res.json(user.friends);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getFollowStatus = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const isFollowing = user.friends.includes(req.query.follower);
        res.json({ isFollowing });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.followUser = async (req, res) => {
    try {
        const followee = await User.findById(req.params.id);
        const follower = await User.findById(req.body.follower);

        followee.friends.push(req.body.follower);
        follower.friends.push(req.params.id);

        await followee.save();
        await follower.save();

        res.json({ message: 'User followed successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.unfollowUser = async (req, res) => {
    try {
        const followee = await User.findById(req.params.id);
        const follower = await User.findById(req.body.follower);

        followee.friends = followee.friends.filter(friend => friend.toString() !== req.body.follower);
        follower.friends = follower.friends.filter(friend => friend.toString() !== req.params.id);

        await followee.save();
        await follower.save();
        res.json({ message: 'User unfollowed successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}