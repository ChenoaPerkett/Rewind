const User = require('../models/User');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUserPlaylists = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('playlists');
        res.json(user.playlists);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUserSavedPlaylists = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('saved');
        res.json(user.saved);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, surname, email, image, bio } = req.body;
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(id, { name, surname, email, image, bio }, { new: true });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
