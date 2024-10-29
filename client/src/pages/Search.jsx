import React, { Component } from "react";
import Layout from "../components/Layout";

class Search extends Component {
  render() {
    return (
        <Layout>
      <div className="min-h-screen bg-white p-8">

        <div className="flex items-center mb-8">
          <input
            type="text"
            placeholder="Search"
            className="bg-black text-white placeholder-gray-400 p-4 w-full max-w-lg rounded-lg focus:outline-none"
          />
        </div>

        <div className="flex space-x-4 mb-8">
          <button className="bg-blue-400 text-white px-6 py-2 rounded-lg focus:outline-none">SONGS</button>
          <button className="text-blue-400 border border-blue-400 px-6 py-2 rounded-lg">PLAYLISTS</button>
          <button className="text-blue-400 border border-blue-400 px-6 py-2 rounded-lg">USERS</button>
        </div>

        <div className="grid grid-cols-6 gap-4 text-sm font-bold bg-blue-100 p-4 rounded-lg mb-4">
          <span>NAME OF SONG</span>
          <span>ARTIST</span>
          <span>TIME</span>
          <span>ALBUM</span>
          <span>ADDED</span>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">+ NEW</button>
        </div>

        {[...Array(4)].map((_, i) => (
          <div key={i} className="grid grid-cols-6 gap-4 items-center bg-blue-200 p-4 rounded-lg mb-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-400 h-10 w-10 rounded-lg"></div>
              <div>
                <p className="font-bold">Song Name</p>
                <p className="text-sm text-gray-600">BY USER </p>
              </div>
            </div>
            <span>Artist Name</span>
            <span>3:53</span>
            <span>Album</span>
            <span>6</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">ADD</button>
          </div>
        ))}
      </div>
        </Layout>
    );
  }
}

export default Search;