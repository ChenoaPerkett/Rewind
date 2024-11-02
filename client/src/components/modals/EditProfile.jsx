import React, { Component } from 'react';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                name: props.user.name,
                image: props.user.image,
                email: props.user.email,
                bio: props.user.bio || '',
                surname: props.user.surname
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            formData: {
                ...this.state.formData,
                [e.target.name]: e.target.value
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.formData);
    }

    render() {
        if (!this.props.isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white text-black p-8 rounded-lg w-96">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Edit Profile</h2>
                        <button
                            onClick={this.props.onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={this.state.formData.name}
                                    onChange={this.handleChange}
                                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Surname</label>
                                <input
                                    type="text"
                                    name="surname"
                                    value={this.state.formData.surname}
                                    onChange={this.handleChange}
                                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={this.state.formData.email}
                                    onChange={this.handleChange}
                                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={this.state.formData.image}
                                    onChange={this.handleChange}
                                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Bio</label>
                                <textarea
                                    name="bio"
                                    value={this.state.formData.bio}
                                    onChange={this.handleChange}
                                    rows="3"
                                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="flex space-x-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={this.props.onClose}
                                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
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

export default EditProfile;