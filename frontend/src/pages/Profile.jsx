import React, { Component } from 'react';
import Layout from "../components/Layout";

class Profile extends Component {
  render() {
    return (
        <Layout>
      <div className=" bg-blue-900 text-white p-8 m-0">

        <div className="flex space-x-8">
          <div className="bg-gray-400 rounded-full h-40 w-40"></div>
          <div className="flex-grow">
            <h2 className="text-3xl font-bold">USER NAME</h2>
            <p className="text-lg">ADD BIO</p>
            <p className="text-lg">EMAIL</p>
            <p className="text-lg">17 PLAYLISTS</p>

    
            <div className="flex space-x-4 mt-4">
              <button className="bg-blue-500 px-4 py-2 rounded text-white">EDIT</button>
              <button className="bg-red-500 px-4 py-2 rounded text-white">DELETE</button>
            </div>
          </div>
        </div>
        <br/>
        <hr/>

   
        <div className="mt-8">
          <div className="flex justify-center space-x-8">
            <button className="text-lg font-semibold border-b-2 border-white pb-2">POSTS</button>
            <button className="text-lg font-semibold">SAVED</button>
            <button className="text-lg font-semibold">FRIENDS</button>
          </div>
        </div>


        <div className="mt-8 grid grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 text-black p-4 rounded-lg">
              <div className="bg-red-400 h-40 mb-4">COVER IMAGE</div>
              <p className="font-bold">NAME OF PLAYLIST</p>
              <p># songs</p>
              <p className="text-sm text-gray-600">Created by</p>
              <p className="text-sm text-gray-600">timestamp</p>
            </div>
          ))}
        </div>
      </div>
      </Layout>
    );
  }
}

export default Profile;

