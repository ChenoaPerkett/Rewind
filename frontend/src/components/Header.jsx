import React from "react";

class Header extends React.Component {
  render() {
    return (
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="flex items-center bg-gray-900 p-1 rounded-full">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-900 text-white placeholder-gray-400 rounded-full p-1 focus:outline-none"
          />
          <button className="ml-2 text-white">
            <i className="fas fa-search">s</i>
          </button>
        </div>
        <div className="flex space-x-4">
          <button className="p-2 text-gray-700">Playlists</button>
          <button className="p-2 bg-gray-200 rounded">Songs</button>
        </div>
        <div className="flex items-center">
          <img src="/assets/images/logo.png" alt="Rewind Logo" className="h-10 w-10" />
        </div>
      </header>
    );
  }
}

export default Header;
