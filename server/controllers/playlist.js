const Song = require('../models/Song');
const Playlist = require('../models/Playlist');

exports.createPlaylist = async (req, res) => {
  try {
    const { name, image, description, genre, hashtags } = req.body;
    const playlist = new Playlist({
      name,
      image,
      genre,
      hashtags,
      description,
      creator: req.user._id,
    });
    await playlist.save();
    res.status(201).json(playlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find().populate('songs').populate('creator');
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
