import React, { Component } from "react";
import Layout from "../components/Layout";
import Songs from "../components/Songs";
import Playlists from "../components/Playlists";

class Home extends Component {
  render() {
    return (
      <Layout>
        <Playlists />
      </Layout>
    );
  }
}

export default Home;
