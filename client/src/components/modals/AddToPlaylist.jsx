import Cookies from "js-cookie";
import React, { Component } from "react";
import { getUserPosts } from "../../services/user";
import { addToPlaylist } from "../../services/song";

class AddToPlaylistModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      selectedPlaylist: "",
      loading: true,
      error: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddToPlaylist = this.handleAddToPlaylist.bind(this);
  }

  async componentDidMount() {
    const token = Cookies.get("token");
    const id = JSON.parse(Cookies.get("user"))._id;
    try {
      const playlists = await getUserPosts(token, id);
      this.setState({ playlists, loading: false });
    } catch (error) {
      this.setState({ error: "Failed to load playlists", loading: false });
    }
  }

  handleChange(event) {
    this.setState({ selectedPlaylist: event.target.value });
  }

  async handleAddToPlaylist() {
    const { selectedPlaylist } = this.state;
    const { songId, onClose, onSuccess } = this.props;

    if (!selectedPlaylist) {
      this.setState({ error: "Please select a playlist" });
      return;
    }

    try {
      await addToPlaylist(songId, selectedPlaylist);
      onSuccess();
      onClose();
    } catch (error) {
      this.setState({ error: "Failed to add song to playlist" });
    }
  }

  render() {
    const { isOpen, onClose } = this.props;
    const { playlists, selectedPlaylist, loading, error } = this.state;

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-80">
          <h3 className="text-xl font-semibold mb-4">Add to Playlist</h3>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          {loading ? (
            <p>Loading playlists...</p>
          ) : (
            <div>
              <label className="block mb-2">Select Playlist:</label>
              <select
                value={selectedPlaylist}
                onChange={this.handleChange}
                className="w-full p-2 border rounded mb-4"
              >
                <option value="">-- Choose Playlist --</option>
                {playlists.map((playlist) => (
                  <option key={playlist._id} value={playlist._id}>
                    {playlist.name}
                  </option>
                ))}
              </select>
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="mr-2 px-4 py-2 text-gray-600 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={this.handleAddToPlaylist}
                  className="px-4 py-2 text-white bg-blue-600 rounded"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AddToPlaylistModal;