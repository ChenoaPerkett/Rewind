import React, { Component } from "react";
import Layout from "../components/Layout";


class Playlist extends Component {
  render() {
    return (
        <Layout>
      <div className="min-h-screen bg-blue-200 p-8">

        <div className="flex space-x-4">

          <div className="w-1/3 bg-blue-100 p-6 rounded-lg">
            <div className="bg-gray-300 h-64 mb-4">cover image</div>
            <h2 className="text-2xl font-bold mb-2">NAME OF PLAYLIST</h2>
            <p className="text-sm mb-4">timestamp</p>
            <p className="mb-1">Created by</p>
            <p className="mb-1">Description</p>
            <p className="mb-1">Genre</p>


            <div className="flex space-x-2 mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">EDIT</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded">DELETE</button>
            </div>

            <p className="mt-6 text-blue-800">#hashtags</p>
          </div>


          <div className="w-2/3 bg-white p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">97 SONGS</h3>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">ADD SONG</button>
            </div>

            <div className="grid grid-cols-5 gap-4 text-sm font-bold border-b py-2">
              <span>#</span>
              <span>SONG NAME</span>
              <span>ALBUM</span>
              <span>DATE</span>
              <span>ACTION</span>
            </div>


            {[...Array(10)].map((_, i) => (
              <div key={i} className="grid grid-cols-5 gap-4 items-center border-b py-2">
                <span>#</span>
                <div className="flex items-center space-x-2">
                  <div className="bg-gray-300 h-8 w-8"></div>
                  <span>Name Song</span>
                </div>
                <span>Album</span>
                <span>Jul 4, 24</span>
                <button className="bg-red-500 text-white px-4 py-1 rounded">DELETE</button>
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
              className="w-full bg-gray-100 p-2 rounded-lg focus:outline-none"
            />
          </div>


          <div className="flex items-start space-x-4 mb-4">
            <div className="bg-gray-300 h-10 w-10 rounded-full"></div>
            <div>
              <p className="font-bold">@Name User <span className="text-sm text-gray-500">Jul 4, 24</span></p>
              <p>Comment</p>
            </div>
            <button className="bg-blue-500 text-white px-4 py-1 rounded">LIKE</button>
          </div>
        </div>
      </div>
      </Layout>
    );
  }
}

export default Playlist;
