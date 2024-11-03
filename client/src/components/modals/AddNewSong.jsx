import React, { Component } from 'react';


class AddNewSong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                name: '',
                artist: '',
                link: '',
                dateAdded: new Date().toISOString() 
            },
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
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

    handleSubmit(e) {
        e.preventDefault();
        const { name, artist, link } = this.state.formData;

    
        if (!/^https:\/\/open\.spotify\.com\/track\/[A-Za-z0-9]+/.test(link)) {
            this.setState({ error: 'Please provide a valid Spotify track link.' });
            return;
        }

  
        this.props.onSubmit({ ...this.state.formData, dateAdded: new Date().toISOString() });
    }

    render() {
        const { isOpen, onClose } = this.props;
        const { formData, error } = this.state;

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white text-black p-8 rounded-lg w-96">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Add New Song</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                            aria-label="Close Add New Song Modal"
                        >
                            ✕
                        </button>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Song Name</label>
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
                                <label className="block text-sm font-medium text-gray-700">Artist</label>
                                <input
                                    type="text"
                                    name="artist"
                                    value={formData.artist}
                                    onChange={this.handleChange}
                                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Spotify Link</label>
                                <input
                                    type="url"
                                    name="link"
                                    value={formData.link}
                                    onChange={this.handleChange}
                                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            </div>
                            <div className="flex space-x-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Add Song
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                    aria-label="Cancel and Close Add New Song Modal"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}



export default AddNewSong;
