import React, { Component } from "react";

import { AddIcon } from "./Icons";
import AddNewSong from "./modals/AddNewSong";
import { getSongs, addSong } from "../services/song";

class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      songs: [],
      loading: true,
      error: null
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.fetchSongs = this.fetchSongs.bind(this);
    this.handleAddSong = this.handleAddSong.bind(this);
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

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  async handleAddSong(songData) {
    try {
      const newSong = await addSong(songData);
      this.setState(prevState => ({
        songs: [...prevState.songs, newSong],
        isModalOpen: false
      }));
    } catch (error) {
      this.setState({ error: "Failed to add song" });
    }
  }

  render() {
    const { isModalOpen, songs, loading, error } = this.state;

    return (
      <div>
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-300 p-6 rounded-lg">
            <h3 className="text-lg font-bold">Favourite song</h3>
            <p className="text-sm">Created by DHFF</p>
          </div>
          <div className="bg-gray-300 p-6 rounded-lg">
            <h3 className="text-lg font-bold">Song of the Day</h3>
            <p className="text-sm">Created by DHFF</p>
          </div>
          <div className="bg-gray-300 p-6 rounded-lg">
            <h3 className="text-lg font-bold">Most liked Songs</h3>
          </div>
        </div>

        <button
          onClick={this.openModal}
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
                <span className="flex items-center">
                  <button onClick={() => this.handleDeleteSong(song._id)}>
                    <AddIcon />
                  </button>
                </span>
              </div>
            ))
          )}
        </div>

        {isModalOpen && (
          <AddNewSong
            isOpen={isModalOpen}
            onClose={this.closeModal}
            onSubmit={this.handleAddSong}
          />
        )}
      </div>
    );
  }
}

export default Songs;