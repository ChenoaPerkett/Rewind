const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    url: { type: String, required: true },
    name: { type: String, required: true },
    artist: { type: String, required: true },
    addedAt: { type: Date, default: Date.now },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Song = mongoose.model('Song', songSchema);
module.exports = Song;
