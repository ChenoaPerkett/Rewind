import Cookies from 'js-cookie';
import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';

import Layout from "../components/Layout";
import EditProfileModal from '../components/modals/EditProfile';
import { updateUser, getUserById, deleteUser, getUserPosts, getUserSavedPlaylists } from '../services/user';
import { getFriends, followUser, unfollowUser, getFollowStatus } from '../services/friend';

class InnerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      profileUser: null,
      isLoading: true,
      error: null,
      friends: [],
      posts: [],
      savedPlaylists: [],
      isFollowing: false,
      activeTab: 'POSTS',
      isFriend: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.fetchProfileData = this.fetchProfileData.bind(this);
  }

  componentDidMount() {
    this.fetchProfileData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.params.id !== this.props.params.id) {
      this.fetchProfileData();
    }
    if (prevState.activeTab !== this.state.activeTab) {
      this.fetchTabData();
    }
  }

  async fetchProfileData() {
    try {
      this.setState({ isLoading: true, error: null });
      const profileId = this.props.params?.id || JSON.parse(Cookies.get("user"))._id;
      const token = Cookies.get("token");
      const follower = JSON.parse(Cookies.get("user"))._id;

      const [profileUser, followStatus, friends] = await Promise.all([
        getUserById(token, profileId),
        getFollowStatus(token, follower, profileId),
        getFriends(token, profileId)
      ]);

      const isFriend = friends.some(friend => friend._id === follower);

      this.setState({
        profileUser,
        isFollowing: followStatus?.isFollowing || false,
        friends: friends || [],
        isFriend,
        isLoading: false
      });

      this.fetchTabData();
    } catch (error) {
      this.setState({ error: "Failed to load profile", isLoading: false });
      console.error(error);
    }
  }

  async fetchTabData() {
    const { activeTab } = this.state;

    const token = Cookies.get("token");
    const id = JSON.parse(Cookies.get('user'))._id;

    try {
      if (activeTab === 'POSTS') {
        const posts = await getUserPosts(token, id);
        this.setState({ posts });
      } else if (activeTab === 'SAVED') {
        const savedPlaylists = await getUserSavedPlaylists(token, id);
        this.setState({ savedPlaylists });
      }
    } catch (error) {
      this.setState({ error: `Failed to load ${activeTab.toLowerCase()}` });
      console.error(error);
    }
  }

  isProfileOwner() {
    const loggedInUser = JSON.parse(Cookies.get("user"));
    return this.state.profileUser?._id === loggedInUser._id;
  }

  handleModalOpen() {
    if (this.isProfileOwner()) {
      this.setState({ isModalOpen: true });
    }
  }

  handleModalClose() {
    this.setState({ isModalOpen: false });
  }

  async handleSubmit(formData) {
    if (!this.isProfileOwner()) return;

    try {
      const token = Cookies.get("token");
      const id = this.state.profileUser._id;
      await updateUser(token, id, formData);

      this.setState({ isModalOpen: false });
      this.fetchProfileData();
    } catch (error) {
      this.setState({ error: "Failed to update profile" });
    }
  }

  async handleDelete() {
    if (!this.isProfileOwner()) return;

    try {
      const token = Cookies.get("token");
      await deleteUser(token, this.state.profileUser._id);
      Cookies.remove("token");
      Cookies.remove("user");
      window.location.href = "/";
    } catch (error) {
      this.setState({ error: "Failed to delete profile" });
    }
  }

  async handleFollow() {
    try {
      const token = Cookies.get("token");
      const followee = this.state.profileUser._id;
      const follower = JSON.parse(Cookies.get("user"))._id;

      if (this.state.isFollowing) {
        await unfollowUser(token, follower, followee);
      } else {
        await followUser(token, follower, followee);
      }

      this.fetchProfileData();
    } catch (error) {
      this.setState({ error: "Failed to update follow status" });
    }
  }

  render() {
    if (this.state.isLoading) return <Layout><div>Loading...</div></Layout>;
    if (this.state.error) return <Layout><div>{this.state.error}</div></Layout>;
    if (!this.state.profileUser) return <Layout><div>Profile not found</div></Layout>;

    const { profileUser, isFollowing, friends, posts, savedPlaylists, activeTab, isFriend } = this.state;
    const isOwner = this.isProfileOwner();

    return (
      <Layout>
        <div className="bg-blue-900 text-white p-8 m-0">
          {this.state.error && (
            <div className="bg-red-500 text-white p-4 mb-4 rounded">
              {this.state.error}
            </div>
          )}

          <div className="flex space-x-8">
            <img src={profileUser.image} alt="profile" className="rounded-full h-40 w-40" />
            <div className="flex-grow">
              <h2 className="text-3xl font-bold">{`${profileUser.name} ${profileUser.surname}`}</h2>
              {profileUser.bio && <p className="text-lg">{profileUser.bio}</p>}
              {isOwner && <p className="text-lg">{profileUser.email}</p>}
              <p className="text-lg">Friends: {friends.length}</p>

              <div className="flex space-x-4 mt-4">
                {isOwner ? (
                  <>
                    <button
                      className="bg-blue-500 px-4 py-2 rounded text-white"
                      onClick={this.handleModalOpen}
                    >
                      EDIT
                    </button>
                    <button
                      className="bg-red-500 px-4 py-2 rounded text-white"
                      onClick={this.handleDelete}
                    >
                      DELETE
                    </button>
                  </>
                ) : (
                  <button
                    onClick={this.handleFollow}
                    className={`px-4 py-2 rounded ${isFollowing ? 'bg-red-500' : 'bg-blue-500'
                      } text-white`}
                  >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {isOwner || isFriend ? (
            <>
              <div className="mt-8">
                <div className="flex justify-center space-x-8">
                  {['POSTS', 'SAVED', 'FRIENDS'].map(tab => (
                    <button
                      key={tab}
                      className={`text-lg font-semibold pb-2 ${activeTab === tab ? 'border-b-2 border-white' : ''
                        }`}
                      onClick={() => this.setState({ activeTab: tab })}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                {activeTab === 'POSTS' && (
                  <div className="grid grid-cols-3 gap-6">
                    {posts.map(post => (
                      <Link to={`/playlist/${post._id}`} key={post._id} className="bg-gray-200 text-black p-4 rounded-lg">
                        <img src={post.image} alt="Post cover" className="bg-gray-300 h-40 w-full object-cover mb-4 rounded" />
                        <p className="font-bold">{post.name}</p>
                        <p className="text-sm text-gray-600">Posted by {post.creator.name}</p>
                        <p className="text-sm text-gray-600">{new Date(post.date).toLocaleDateString()}</p>
                      </Link>
                    ))}
                  </div>
                )}
                {activeTab === 'SAVED' && (
                  <div className="grid grid-cols-3 gap-6">
                    {savedPlaylists.map(playlist => (
                      <Link to={`/playlist/${playlist._id}`} key={playlist._id} className="bg-gray-200 text-black p-4 rounded-lg">
                        <div className="bg-red-400 h-40 mb-4">COVER IMAGE</div>
                        <p className="font-bold">{playlist.name}</p>
                        <p># songs: {playlist.songCount}</p>
                        <p className="text-sm text-gray-600">Created by {playlist.creator}</p>
                        <p className="text-sm text-gray-600">{playlist.timestamp}</p>
                      </Link>
                    ))}
                  </div>
                )}
                {activeTab === 'FRIENDS' && (
                  <div className="grid grid-cols-3 gap-6">
                    {friends.map(friend => (
                      <Link to={`/profile/${friend._id}`} key={friend._id}>
                        <div className="bg-gray-200 text-black p-4 rounded-lg">
                          <img
                            src={friend.image}
                            alt={friend.name}
                            className="w-full h-40 object-cover mb-4 rounded"
                          />
                          <p className="font-bold">{`${friend.name} ${friend.surname}`}</p>
                          {friend.bio && <p className="text-sm text-gray-600">{friend.bio}</p>}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : null}

          {isOwner && (
            <EditProfileModal
              isOpen={this.state.isModalOpen}
              onClose={this.handleModalClose}
              user={profileUser}
              onSubmit={this.handleSubmit}
            />
          )}
        </div>
      </Layout>
    );
  }
}

const Profile = (props) => {
  const params = useParams();
  return <InnerProfile {...props} params={params} />;
};

export default Profile;