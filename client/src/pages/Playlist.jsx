import React, { Component } from "react";
import Layout from "../components/Layout";
import SongSearchModal from "../components/modals/SearchSong";
import { addToPlaylist, removeFromPlaylist } from "../services/song";
import { getPlaylist, deletePlaylist, getComments, addComment } from "../services/playlist";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

class InnerPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: null,
      songs: [],
      comments: [],
      newComment: "",
      loading: true,
      error: null,
      isModalOpen: false,
      isOwner: false
    };

    this.handleDeleteSong = this.handleDeleteSong.bind(this);
    this.handleDeletePlaylist = this.handleDeletePlaylist.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
  }

  async componentDidMount() {
    await this.fetchPlaylistData();
  }

  async fetchPlaylistData() {
    try {
      const { id } = this.props.params;
      const playlistData = await getPlaylist(id);

      const loggedInUserId = JSON.parse(Cookies.get("user"))._id;

      const isOwner = loggedInUserId === playlistData.creator;

      this.setState({
        playlist: playlistData,
        songs: playlistData.songs,
        comments: [],
        loading: false,
        isOwner
      });
    } catch (error) {
      this.setState({ error: "Failed to load playlist data", loading: false });
    }
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  async addSongToPlaylist(song) {
    try {
      const { id } = this.props.params;
      const newSong = await addToPlaylist(song, id);
      this.setState(prevState => ({
        songs: [...prevState.songs, newSong],
        isModalOpen: false
      }));
    } catch (error) {
      this.setState({ error: "Failed to add song" });
    }
  }

  async handleDeleteSong(songId) {
    try {
      const { id } = this.props.params;
      await removeFromPlaylist(songId, id);
      this.setState(prevState => ({
        songs: prevState.songs.filter(song => song._id !== songId)
      }));
    } catch (error) {
      this.setState({ error: "Failed to delete song" });
    }
  }

  async handleDeletePlaylist() {
    try {
      const { id } = this.props.params;
      await deletePlaylist(id);
      this.props.navigate("/playlists");
    } catch (error) {
      this.setState({ error: "Failed to delete playlist" });
    }
  }

  render() {
    const { playlist, songs, comments, newComment, loading, error, isModalOpen, isOwner } = this.state;

    if (loading) return <Layout><div>Loading...</div></Layout>;
    if (error) return <Layout><div>{error}</div></Layout>;
    if (!playlist) return <Layout><div>Playlist not found</div></Layout>;

    return (
      <Layout>
        <div className="min-h-screen bg-blue-200 p-8">
          <div className="flex space-x-4">
            <div className="w-1/3 bg-blue-100 p-6 rounded-lg">
              <img src={playlist.image} alt="Cover" className="bg-gray-300 h-64 mb-4 rounded" />
              <h2 className="text-2xl font-bold mb-2">{playlist.name}</h2>
              <p className="text-sm mb-4">{new Date(playlist.date).toLocaleDateString()}</p>
              <p className="mb-1">Created by {playlist.creator.name}</p>
              <p className="mb-1">{playlist.description}</p>
              <p className="mb-1">{playlist.genre}</p>

              {isOwner && (
                <div className="flex space-x-2 mt-4">
                  <button onClick={this.handleDeletePlaylist} className="bg-red-500 text-white px-4 py-2 rounded">
                    DELETE
                  </button>
                </div>
              )}

              {playlist.hashtags.map(tag => (
                <p key={tag} className="mt-2 text-blue-800">{tag}</p>
              ))}
            </div>

            <div className="w-2/3 bg-white p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">{songs.length} SONGS</h3>

                {isOwner && (
                  <button onClick={this.openModal} className="bg-blue-500 text-white px-4 py-2 rounded">
                    ADD SONG
                  </button>
                )}
              </div>

              <div className="grid grid-cols-5 gap-4 text-sm font-bold border-b py-2">
                <span className="w-4">#</span>
                <span>SONG NAME</span>
                <span>ALBUM</span>
                <span>DATE</span>
                <span>ACTION</span>
              </div>
              {songs.map((song, index) => (
                <div key={song._id} className="grid grid-cols-5 gap-4 items-center border-b py-2">
                  <span className="w-4">{index + 1}</span>
                  <div className="flex items-center space-x-2">
                    <img src={song.image} alt="Song cover" className="bg-gray-300 h-8 w-8 rounded" />
                    <span>{song.name}</span>
                  </div>
                  <span>{song.album}</span>
                  <span>{new Date(song.date).toLocaleDateString()}</span>

                  {isOwner && (
                    <button onClick={() => this.handleDeleteSong(song._id)} className="bg-red-500 text-white px-4 py-1 rounded">
                      DELETE
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">COMMENTS</h3>

            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-gray-300 h-10 w-10 rounded-full"></div>
              <input
                type="text"
                placeholder="Add a comment"
                value={newComment}
                onChange={(e) => this.setState({ newComment: e.target.value })}
                onClick={(e) => e.key === 'Enter' && this.handleAddComment()}
                className="w-full bg-gray-100 p-2 rounded-lg focus:outline-none"
              />
            </div>

            {comments.map(comment => (
              <div key={comment._id} className="flex items-start space-x-4 mb-4">
                <div className="bg-gray-300 h-10 w-10 rounded-full"></div>
                <div>
                  <p className="font-bold">@{comment.user.name} <span className="text-sm text-gray-500">{new Date(comment.date).toLocaleDateString()}</span></p>
                  <p>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>

          <SongSearchModal
            isOpen={isModalOpen}
            onClose={this.closeModal}
            onAddSong={this.addSongToPlaylist}
          />
        </div>
      </Layout>
    );
  }
}

const Playlist = (props) => {
  const params = useParams();
  return <InnerPlaylist {...props} params={params} />;
};

export default Playlist;