import React, { Component } from "react";
import { AddIcon } from "./Icons";
import AddNewSong from "./modals/AddNewSong";

class Songs extends Component {
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
      <div>
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

          {[...Array(4)].map((_, i) => (
            <div key={i} className="grid grid-cols-5 gap-4 p-4 border-b">
              <div className="flex items-center">
                <div className="bg-gray-300 h-10 w-10 mr-4"></div>
                <div>
                  <p className="font-bold">Song Name</p>
                  <p className="text-sm">by User </p>
                </div>
              </div>
              <span>Artist Name</span>
              <span>3:53</span>
              <span>Album</span>
              <span className="flex items-center">
                <button><AddIcon /></button>
              </span>
            </div>
          ))}
        </div>

        {/* Add New Song Modal */}
        {isModalOpen && (
          <AddNewSong
            isOpen={isModalOpen}
            onClose={this.closeModal}
            onSubmit={(data) => {
              console.log("New song data:", data);
              this.closeModal();
            }}
          />
        )}
      </div>
    );
  }
}

export default Songs;
