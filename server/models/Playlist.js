const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    image: String,
    genre: String,
    description: String,
    hashtags: [{ type: String }],
    name: { type: String, required: true },
    date: { type: Date, default: Date.now },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
