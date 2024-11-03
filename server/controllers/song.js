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
        const song = await Song.findByIdAndDelete(req.params.id);
        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }
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

exports.addToPlaylist = async (req, res) => {
    try {
        const { id, pid } = req.params;
        const playlist = await Playlist.findById(pid);
        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        const song = await Song.findById(id);
        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }
        if (playlist.songs.includes(id)) {
            return res.status(400).json({ error: 'Song already exists in playlist' });
        }
        playlist.songs.push(id);
        await playlist.save();
        res.json(playlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removeFromPlaylist = async (req, res) => {
    try {
        const { pid, id } = req.params;
        const playlist = await Playlist.findById(pid);
        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        if (!playlist.songs.includes(id)) {
            return res.status(400).json({ error: 'Song does not exist in playlist' });
        }
        playlist.songs = playlist.songs.filter(song => song.toString() !== id);
        await playlist.save();
        res.json(playlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};