import Cookies from "js-cookie";
import React, { Component } from "react";
import { AddIcon, DeleteIcon } from "./Icons";
import AddNewSong from "./modals/AddNewSong";
import AddToPlaylistModal from "./modals/AddToPlaylist";
import { getSongs, addSong, deleteSong } from "../services/song";

class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddSongModalOpen: false,
      isAddToPlaylistModalOpen: false,
      selectedSongId: null,
      songs: [],
      loading: true,
      error: null
    };

    this.openAddSongModal = this.openAddSongModal.bind(this);
    this.closeAddSongModal = this.closeAddSongModal.bind(this);
    this.openAddToPlaylistModal = this.openAddToPlaylistModal.bind(this);
    this.closeAddToPlaylistModal = this.closeAddToPlaylistModal.bind(this);
    this.fetchSongs = this.fetchSongs.bind(this);
    this.handleAddSong = this.handleAddSong.bind(this);
    this.handleDeleteSong = this.handleDeleteSong.bind(this); // New method for deletion
  }

  componentDidMount() {
    this.fetchSongs();
  }

  async fetchSongs() {
    try {
      const songs = await getSongs();
      this.setState({ songs, loading: false });
    } catch (error) {
      this.setState({ error: "Failed to load songs", loading: false });
    }
  }

  openAddSongModal() {
    this.setState({ isAddSongModalOpen: true });
  }

  closeAddSongModal() {
    this.setState({ isAddSongModalOpen: false });
  }

  openAddToPlaylistModal(songId) {
    this.setState({ isAddToPlaylistModalOpen: true, selectedSongId: songId });
  }

  closeAddToPlaylistModal() {
    this.setState({ isAddToPlaylistModalOpen: false, selectedSongId: null });
  }

  async handleAddSong(songData) {
    try {
      const newSong = await addSong(songData);
      this.setState(prevState => ({
        songs: [...prevState.songs, newSong],
        isAddSongModalOpen: false
      }));
    } catch (error) {
      this.setState({ error: "Failed to add song" });
    }
  }

  async handleDeleteSong(songId) {
    try {
      await deleteSong(songId);
      this.setState(prevState => ({
        songs: prevState.songs.filter(song => song._id !== songId)
      }));
    } catch (error) {
      this.setState({ error: "Failed to delete song" });
    }
  }

  render() {
    const { isAddSongModalOpen, isAddToPlaylistModalOpen, selectedSongId, songs, loading, error } = this.state;

    return (
      <div>
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-300 p-6 rounded-lg">
            <h3 className="text-lg font-bold">Favourite Song</h3>
            <p className="text-sm">Created by DHFF</p>
          </div>
          <div className="bg-gray-300 p-6 rounded-lg">
            <h3 className="text-lg font-bold">Song of the Day</h3>
            <p className="text-sm">Created by DHFF</p>
          </div>
          <div className="bg-gray-300 p-6 rounded-lg">
            <h3 className="text-lg font-bold">Most liked Song</h3>
          </div>
        </div>

        <button
          onClick={this.openAddSongModal}
          className="flex items-center mb-2 p-2 bg-blue-950 px-4 py-2 rounded-lg text-white ml-auto"
        >
          + NEW
        </button>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="grid grid-cols-5 gap-4 text-sm font-bold p-4 border-b">
            <span>Name of Song</span>
            <span>Artist</span>
            <span>Date</span>
            <span>Album</span>
            <span>Action</span>
          </div>

          {loading ? (
            <p>Loading songs...</p>
          ) : (
            songs.map(song => (
              <div key={song._id} className="grid grid-cols-5 gap-4 p-4 border-b">
                <a href={song.url} target="_blank" rel="noreferrer">
                  <div className="flex items-center">
                    <img src={song.image} alt={song.name} className="h-10 w-10 mr-4" />
                    <div>
                      <p className="font-bold">{song.name}</p>
                      <p className="text-sm">by {song.artist}</p>
                    </div>
                  </div>
                </a>

                <span>{song.artist}</span>
                <span>{new Date(song.date).toLocaleDateString()}</span>
                <span>{song.album}</span>
                <span className="flex items-center space-x-2">
                  <button onClick={() => this.openAddToPlaylistModal(song._id)}>
                    <AddIcon />
                  </button>
                  {song.addedBy === JSON.parse(Cookies.get("user"))._id && (
                    <button onClick={() => this.handleDeleteSong(song._id)}>
                      <DeleteIcon />
                    </button>
                  )}
                </span>
              </div>
            ))
          )}
        </div>

        {isAddSongModalOpen && (
          <AddNewSong
            isOpen={isAddSongModalOpen}
            onClose={this.closeAddSongModal}
            onSubmit={this.handleAddSong}
          />
        )}

        {isAddToPlaylistModalOpen && (
          <AddToPlaylistModal
            isOpen={isAddToPlaylistModalOpen}
            onClose={this.closeAddToPlaylistModal}
            songId={selectedSongId}
            onSuccess={this.fetchSongs}
          />
        )}
      </div>
    );
  }
}

export default Songs;