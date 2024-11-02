import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import React, { Component, useState } from 'react';

import Layout from "../components/Layout";
import { updateUser} from '../services/user';
import EditProfileModal from '../components/modals/EditProfile';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalOpen() {
    this.setState({ isModalOpen: true });
  }

  handleModalClose() {
    this.setState({ isModalOpen: false });
  }

  handleSubmit(formData) {
    const token = Cookies.get("token");
    const email = JSON.parse(Cookies.get("user")).email;
    
    updateUser(token, email, formData);
    this.setState({ isModalOpen: false });
  }

  render() {
    const user = JSON.parse(Cookies.get("user"));

    return (
      <Layout>
        <div className=" bg-blue-900 text-white p-8 m-0 ">

          <div className="flex space-x-8">
            <img src={user.image} alt="profile" className="rounded-full h-40 w-40" />
            <div className="flex-grow">
              <h2 className="text-3xl font-bold">{`${user.name} ${user.surname}`}</h2>
              {user.bio && <p className="text-lg">{user.bio}</p>}
              <p className="text-lg">{`${user.email}`}</p>
              <p className="text-lg">17 PLAYLISTS</p>


              <div className="flex space-x-4 mt-4">
                <button
                  className="bg-blue-500 px-4 py-2 rounded text-white"
                  onClick={this.handleModalOpen}
                >
                  EDIT
                </button>
                <button className="bg-red-500 px-4 py-2 rounded text-white">DELETE</button>
              </div>
            </div>
          </div>
          <br />
          <hr />

          <div className="mt-8">
            <div className="flex justify-center space-x-8">
              <button className="text-lg font-semibold border-b-2 border-white pb-2">POSTS</button>
              <button className="text-lg font-semibold">SAVED</button>
              <button className="text-lg font-semibold">FRIENDS</button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-6">

            {[...Array(6)].map((_, i) => (<Link to="/playlist">
              <div key={i} className="bg-gray-200 text-black p-4 rounded-lg">
                <div className="bg-red-400 h-40 mb-4">COVER IMAGE</div>
                <p className="font-bold">NAME OF PLAYLIST</p>
                <p># songs</p>
                <p className="text-sm text-gray-600">Created by</p>
                <p className="text-sm text-gray-600">timestamp</p>
              </div>  </Link>
            ))}
          </div>

          <EditProfileModal
            isOpen={this.state.isModalOpen}
            onClose={this.handleModalClose}
            user={user}
            onSubmit={this.handleSubmit}
          />
        </div>
      </Layout>
    );
  }
}

export default Profile;

