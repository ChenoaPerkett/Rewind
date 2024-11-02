const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
const songRoutes = require('./routes/song');
const playlistRoutes = require('./routes/playlist');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
//app.use(express.static("frontend/public"));

connectDB();

app.use('/users', userRoutes);
app.use('/songs', songRoutes);
app.use('/playlists', playlistRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});