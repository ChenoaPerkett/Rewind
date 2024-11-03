import React, { Component } from "react";
import AddNewPlaylist from "./modals/AddNewPlaylist";

class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    const { isModalOpen } = this.state;

    return (
      <div className="min-h-screen">
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
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex justify-between items-center bg-blue-300 p-6 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="bg-gray-300 h-24 w-32"></div>
                </div>

                <div>
                  <h3 className="font-bold">NAME OF PLAYLIST</h3>
                  <p className="text-sm">Created by</p>
                  <p className="text-sm">Description</p>
                  <p className="text-sm">Genre</p>
                  <p className="text-blue-800 mt-2">#hashtags</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-600">timestamp of created</p>
                <button className="bg-blue-950 text-white px-4 py-2 rounded-lg">Add playlist</button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Playlist Modal */}
        {isModalOpen && (
          <AddNewPlaylist
            isOpen={isModalOpen}
            onClose={this.closeModal}
            onSubmit={(data) => {
              console.log("Playlist data:", data);
              this.closeModal();
            }}
            genres={['Pop', 'Rnb', 'Afrohits']}  // Example genres
            playlistCount={3}  // Replace with dynamic count if needed
          />
        )}
      </div>
    );
  }
}

export default Playlists;
