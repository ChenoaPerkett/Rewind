import React, { Component } from 'react';
import { getSongs } from '../../services/song';

class SongSearchModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            allSongs: [],
            filteredSongs: []
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleAddSong = this.handleAddSong.bind(this);
    }

    async componentDidMount() {
        const allSongs = await getSongs();
        this.setState({ allSongs, filteredSongs: allSongs });
    }

    handleSearchChange(e) {
        const searchQuery = e.target.value.toLowerCase();
        const filteredSongs = this.state.allSongs.filter(song =>
            song.name.toLowerCase().includes(searchQuery)
        );
        this.setState({ searchQuery, filteredSongs });
    }

    handleAddSong(song) {
        this.props.onAddSong(song);
    }

    render() {
        const { isOpen, onClose } = this.props;
        const { searchQuery, filteredSongs } = this.state;

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-1/2">
                    <h2 className="text-2xl font-bold mb-4">Add Song to Playlist</h2>
                    <input
                        type="text"
                        placeholder="Search for a song"
                        value={searchQuery}
                        onChange={this.handleSearchChange}
                        className="w-full mb-4 p-2 border rounded"
                    />

                    <div className="max-h-60 overflow-y-auto">
                        {filteredSongs.map(song => (
                            <div
                                key={song._id}
                                className="flex justify-between items-center p-2 border-b"
                            >
                                <p>{song.name}</p>
                                <button
                                    onClick={() => this.handleAddSong(song._id)}
                                    className="bg-blue-500 text-white px-4 py-1 rounded"
                                >
                                    Add
                                </button>
                            </div>
                        ))}
                    </div>

                    <button onClick={onClose} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
                        Close
                    </button>
                </div>
            </div>
        );
    }
}

export default SongSearchModal;