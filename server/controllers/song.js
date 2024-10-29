const Song = require('../models/Song');
const Playlist = require('../models/Playlist');

exports.addSong = async (req, res) => {
    try {
        const { name, image, artist, url } = req.body;
        const song = new Song({
            url,
            name,
            image,
            artist,
            addedBy: req.user._id,
        });
        await song.save();
        res.status(201).json(song);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
