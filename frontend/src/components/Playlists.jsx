import React, { Component } from "react";

class Playlists extends Component {
  render() {
    return (
      <div className="min-h-screen p-8">
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-300 p-6 rounded-lg">
            <h3 className="text-lg font-bold">Favourite Playlis</h3>
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
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add playlist</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Playlists;