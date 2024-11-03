const Song = require('../models/Song');
const Playlist = require('../models/Playlist');

exports.getSongs = async (req, res) => {
    try {
        const songs = await Song.find().sort({ createdAt: -1 });
        res.json(songs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.addSong = async (req, res) => {
    try {
        const { name, image, artist, url, addedBy } = req.body;
        const song = new Song({
            url,
            name,
            image,
            artist,
            addedBy
        });
        await song.save();
        res.status(201).json(song);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteSong = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }
        await song.remove();
        res.json({ message: 'Song deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateSong = async (req, res) => {
    try {
        const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }

        res.json(song);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addSongToPlaylist = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const { songId } = req.body;
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        const song = await Song.findById(songId);
        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }
        if (playlist.songs.includes(songId)) {
            return res.status(400).json({ error: 'Song already exists in playlist' });
        }
        playlist.songs.push(songId);
        await playlist.save();
        res.json(playlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removeSongFromPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.params;
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        if (!playlist.songs.includes(songId)) {
            return res.status(400).json({ error: 'Song does not exist in playlist' });
        }
        playlist.songs = playlist.songs.filter(song => song.toString() !== songId);
        await playlist.save();
        res.json(playlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};