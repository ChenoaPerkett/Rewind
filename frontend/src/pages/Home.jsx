import React, { Component } from "react";
import Layout from "../components/Layout";
import { AddIcon } from "../components/Icons";

class Home extends Component {
  render() {
    return (
      <Layout>
        
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
            <h3 className="text-lg font-bold">Most Played Songs</h3>
          </div>
        </div>
        <button className="flex items-center mb-2 p-2 bg-blue-950 rounded-full text-white ml-auto">Add New</button>
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
              <button><AddIcon/></button>
              </span>
            </div>
          ))}
        </div>
      </Layout>
    );
  }
}

export default Home;
