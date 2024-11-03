import React, { Component } from "react";
import Layout from "../components/Layout";
import { getSongs } from "../services/song";
import { getUsers } from "../services/user";
import { getPlaylists } from "../services/playlist";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      activeCategory: "SONGS",
      songs: [],
      playlists: [],
      users: [],
      filteredResults: [],
      loading: true,
      error: null,
    };

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  async componentDidMount() {
    try {
      const [songs, playlists, users] = await Promise.all([
        getSongs(),
        getPlaylists(),
        getUsers(),
      ]);

      console.log("Playlist", playlists);

      this.setState({
        songs,
        playlists,
        users,
        filteredResults: songs,
        loading: false,
      });
    } catch (error) {
      this.setState({ error: "Failed to load data", loading: false });
    }
  }

  handleSearchInput(e) {
    const searchQuery = e.target.value.toLowerCase();
    this.setState({ searchQuery }, this.filterResults);
  }

  handleCategoryChange(category) {
    this.setState({ activeCategory: category }, this.filterResults);
  }

  filterResults() {
    const { searchQuery, activeCategory, songs, playlists, users } = this.state;
    let filteredResults = [];

    if (activeCategory === "SONGS") {
      filteredResults = songs.filter((song) =>
        song.name.toLowerCase().includes(searchQuery)
      );
    } else if (activeCategory === "PLAYLISTS") {
      filteredResults = playlists.filter((playlist) =>
        playlist.name.toLowerCase().includes(searchQuery)
      );
    } else if (activeCategory === "USERS") {
      filteredResults = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery)
      );
    }

    this.setState({ filteredResults });
  }

  renderResults() {
    const { filteredResults, activeCategory } = this.state;

    if (activeCategory === "SONGS") {
      return filteredResults.map((song) => (
        <div key={song._id} className="grid grid-cols-6 gap-4 items-center bg-blue-200 p-4 rounded-lg mb-4">
          <div className="flex items-center space-x-4">
            <img src={song.image} alt={song.name} className="bg-gray-400 h-10 w-10 rounded-lg" />
            <div>
              <p className="font-bold">{song.name}</p>
              <p className="text-sm text-gray-600">BY {song.artist}</p>
            </div>
          </div>
          <span>{song.artist}</span>
          <span>{song.duration}</span>
          <span>{song.album}</span>
          <span>{song.added}</span>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">ADD</button>
        </div>
      ));
    } else if (activeCategory === "PLAYLISTS") {
      return filteredResults.map((playlist) => (
        <div key={playlist._id} className="bg-blue-200 p-4 rounded-lg mb-4">
          <img src={playlist.image} alt={playlist.name} className="h-24 w-32" />
          <p className="font-bold">{playlist.name}</p>
        </div>
      ));
    } else if (activeCategory === "USERS") {
      return filteredResults.map((user) => (
        <div key={user._id} className="bg-blue-200 p-4 rounded-lg mb-4">
          <p className="font-bold">{user.name}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      ));
    }
  }

  render() {
    const { searchQuery, activeCategory, loading, error } = this.state;

    return (
      <Layout>
        <div className="min-h-screen bg-white p-8">
          <div className="flex items-center mb-8">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={this.handleSearchInput}
              className="bg-black text-white placeholder-gray-400 p-4 w-full max-w-lg rounded-lg focus:outline-none"
            />
          </div>

          <div className="flex space-x-4 mb-8">
            {["SONGS", "PLAYLISTS", "USERS"].map((category) => (
              <button
                key={category}
                onClick={() => this.handleCategoryChange(category)}
                className={`px-6 py-2 rounded-lg focus:outline-none ${activeCategory === category ? "bg-blue-400 text-white" : "text-blue-400 border border-blue-400"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            this.renderResults()
          )}
        </div>
      </Layout>
    );
  }
}

export default Search;