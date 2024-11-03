import React, { Component } from 'react';


class AddNewPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                name: `New Playlist #${props.playlistCount + 1}`, 
                genre: '',
                description: '',
                coverImage: null,
                hashtags: '',
                songs: props.initialSongs || []
            },
            error: '',
            isDragOver: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleImageDrop = this.handleImageDrop.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [name]: value
            },
            error: ''
        }));
    }

    handleImageDrop(e) {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            this.setState((prevState) => ({
                formData: {
                    ...prevState.formData,
                    coverImage: URL.createObjectURL(file)
                },
                isDragOver: false
            }));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { name, genre } = this.state.formData;
        if (!name || !genre) {
            this.setState({ error: 'Please complete all required fields.' });
            return;
        }

        this.props.onSubmit({ ...this.state.formData });
    }

    render() {
        const { isOpen, onClose, genres, playlistCount } = this.props;
        const { formData, error, isDragOver } = this.state;

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white text-black p-8 rounded-lg w-96">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Add New Playlist</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                            aria-label="Close Add New Playlist Modal"
                        >
                            ✕
                        </button>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Playlist Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={this.handleChange}
                                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Genre</label>
                                <select
                                    name="genre"
                                    value={formData.genre}
                                    onChange={this.handleChange}
                                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="">Select a genre</option>
                                    {genres.map((genre) => (
                                        <option key={genre} value={genre}>{genre}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={this.handleChange}
                                    rows="3"
                                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div
                                onDragOver={(e) => { e.preventDefault(); this.setState({ isDragOver: true }); }}
                                onDragLeave={() => this.setState({ isDragOver: false })}
                                onDrop={this.handleImageDrop}
                                className={`w-full p-6 border rounded focus:ring-blue-500 focus:border-blue-500 ${isDragOver ? 'bg-gray-200' : 'bg-white'}`}
                            >
                                {formData.coverImage ? (
                                    <img src={formData.coverImage} alt="Cover" className="w-full h-40 object-cover rounded" />
                                ) : (
                                    <p>Drag & Drop cover image here or click to upload</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Hashtags</label>
                                <input
                                    type="text"
                                    name="hashtags"
                                    value={formData.hashtags}
                                    onChange={this.handleChange}
                                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Add hashtags, e.g., #roadtripmusic"
                                />
                            </div>
                            <div className="flex space-x-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Create Playlist
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                    aria-label="Cancel and Close Add New Playlist Modal"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
            </div>
        );
    }
}



export default AddNewPlaylist;
