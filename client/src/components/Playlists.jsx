import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddNewPlaylist from "./modals/AddNewPlaylist";
import { getPlaylists, addPlaylist, deletePlaylist } from "../services/playlist";

class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      playlists: [],
      loading: true,
      error: null
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleAddPlaylist = this.handleAddPlaylist.bind(this);
    this.fetchPlaylists = this.fetchPlaylists.bind(this);
    this.handleDeletePlaylist = this.handleDeletePlaylist.bind(this);
  }

  componentDidMount() {
    this.fetchPlaylists();
  }

  async fetchPlaylists() {
    try {
      const playlists = await getPlaylists();
      this.setState({ playlists, loading: false });
    } catch (error) {
      this.setState({ error: "Failed to load playlists", loading: false });
    }
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  async handleAddPlaylist(playlistData) {
    try {
      const newPlaylist = await addPlaylist(playlistData);
      this.setState(prevState => ({
        playlists: [...prevState.playlists, newPlaylist],
        isModalOpen: false
      }));
    } catch (error) {
      this.setState({ error: "Failed to add playlist" });
    }
  }

  async handleDeletePlaylist(playlistId) {
    try {
      await deletePlaylist(playlistId);
      this.setState(prevState => ({
        playlists: prevState.playlists.filter(playlist => playlist._id !== playlistId)
      }));
    } catch (error) {
      this.setState({ error: "Failed to delete playlist" });
    }
  }

  render() {
    const { isModalOpen, playlists, loading, error } = this.state;

    return (
      <div className="min-h-screen">
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-300 p-6 rounded-lg">
            <h3 className="text-lg font-bold">Favourite Playlist</h3>
            <p className="text-sm">Created by DHFF</p>
          </div>
          <div className="bg-gray-300 p-6 rounded-lg">
            <h3 className="text-lg font-bold">Playlist of the Day</h3>
            <p className="text-sm">Created by DHFF</p>
          </div>
          <div className="bg-gray-300 p-6 rounded-lg">
            <h3 className="text-lg font-bold">Most liked Playlist</h3>
          </div>
        </div>

        <button
          onClick={this.openModal}
          className="flex items-center mb-2 p-2 bg-blue-950 px-4 py-2 rounded-lg text-white ml-auto"
        >
          + NEW
        </button>

        <div className="space-y-6">
          {loading ? (
            <p>Loading playlists...</p>
          ) : (
            playlists.map(playlist => (
              <div key={playlist._id} className="flex justify-between items-center bg-blue-300 p-6 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Link to={`/playlist/${playlist._id}`}>
                    <div className="relative">
                      <img src={playlist.image} alt={playlist.name} className="h-24 w-32" />
                    </div>

                    <div>
                      <h3 className="font-bold">{playlist.name}</h3>
                      <p className="text-sm">Created by {`${playlist.creator.name} ${playlist.creator.surname}`}</p>
                      <p className="text-sm">{playlist.description}</p>
                      <p className="text-sm">{playlist.genre}</p>
                      {playlist.hashtags.map(hashtag => (
                        <p key={hashtag} className="text-blue-800 mt-2">{hashtag}</p>
                      ))}
                    </div>
                  </Link>
                </div>

                <div className="flex items-center space-x-4">
                  <p className="text-sm text-gray-600">{new Date(playlist.date).toLocaleDateString()}</p>
                  <button
                    onClick={() => this.handleDeletePlaylist(playlist._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {isModalOpen && (
          <AddNewPlaylist
            isOpen={isModalOpen}
            onClose={this.closeModal}
            onSubmit={this.handleAddPlaylist}
            genres={['Pop', 'Rnb', 'Afrohits']}
            playlistCount={playlists.length}
          />
        )}
      </div>
    );
  }
}

export default Playlists;