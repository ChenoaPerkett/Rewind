const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    bio: { type: String },
    image: { type: String },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    saved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
    playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
