import React, { Component } from "react";
import Layout from "../components/Layout";
import Songs from "../components/Songs";
import Playlists from "../components/Playlists";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "songs" 
    };
  }

  setActiveTab(tab) {
    this.setState({ activeTab: tab });
  }

  render() {
    const { activeTab } = this.state;

    return (
      <Layout>
        <div className="flex items-center justify-center mb-4 space-x-4">
          <button
            onClick={() => this.setActiveTab("playlists")}
            className={`p-2 rounded-full min-w-24 ${
              activeTab === "playlists"
                ? "bg-blue-950 text-white"
                : "text-gray-700 hover:text-white hover:bg-blue-400"
            }`}
          >
            Playlists
          </button>
          <button
            onClick={() => this.setActiveTab("songs")}
            className={`p-2 rounded-full min-w-24 ${
              activeTab === "songs"
                ? "bg-blue-950 text-white"
                : "text-gray-700 hover:text-white hover:bg-blue-400"
            }`}
          >
            Songs
          </button>
        </div>

        {activeTab === "songs" ? <Songs /> : <Playlists />}
      </Layout>
    );
  }
}

export default Home;

