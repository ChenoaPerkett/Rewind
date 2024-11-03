const Playlist = require('../models/Playlist');
const User = require('../models/User');

exports.getPlaylist = async (req, res) => {
  try {
    const id = req.params.id;
    const playlist = await Playlist.findById(id).populate('songs');
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    res.json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.deletePlaylist = async (req, res) => {
  try {
    const id = req.params.id;
    const playlist = await Playlist.findByIdAndDelete(id);
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    res.json({ message: 'Playlist deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.createPlaylist = async (req, res) => {
  try {
    const { name, image, description, genre, hashtags, creator } = req.body;
    const user = await User.findById(creator);
    const playlist = new Playlist({
      name,
      image,
      genre,
      hashtags,
      description,
      creator
    });

    await playlist.save();
    user.playlists.push(playlist._id);
    await user.save();
    res.status(201).json(playlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getPlaylistsFeed = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
      .populate({
        path: 'friends',
        populate: [
          { path: 'saved', model: 'Playlist' },
          { path: 'playlists', model: 'Playlist' }
        ]
      })
      .populate('playlists')
      .populate('saved');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const createdPlaylists = user.playlists || [];
    const friendsSavedPlaylists = user.friends.flatMap(friend => friend.saved || []);
    const friendsCreatedPlaylists = user.friends.flatMap(friend => friend.playlists || []);
    const feedPlaylists = [...createdPlaylists, ...friendsSavedPlaylists, ...friendsCreatedPlaylists];

    const populatedFeed = await Playlist.populate(feedPlaylists, [
      { path: 'songs' },
      { path: 'creator', select: 'name surname' }
    ]);

    populatedFeed.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json(populatedFeed);
  } catch (error) {
    console.error("Error fetching playlist feed:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const id = req.params.id;
    const playlist = await Playlist.findById(id).populate('comments');
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    res.json(playlist.comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.addComment = async (req, res) => {
  try {
    const id = req.params.id;
    const playlist = await Playlist.findById(id);
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    const { text } = req.body;
    const comment = { text, user: req.user.id };
    playlist.comments.push(comment);
    await playlist.save();
    res.status(201).json(comment);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}


