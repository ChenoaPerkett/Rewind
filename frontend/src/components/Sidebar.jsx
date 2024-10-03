import React from "react";

class Sidebar extends React.Component {
  render() {
    return (
      <aside className=" bg-blue-950 p-8 flex flex-col">
        <div className="flex items-center mb-8">
          <div className="bg-blue-600 rounded-full h-16 w-16 mr-4"></div>
          <h2 className="text-xl font-bold text-white">User Name</h2>
        </div>

        <nav className="space-y-4  text-white">
          <a href="#" className="block text-lg font-semibold p-1 rounded hover:bg-blue-600">
            Home
          </a>
          <a href="#" className="block text-lg font-semibold p-1 rounded hover:bg-blue-600">
           My Music
          </a>
          <a href="#" className="block text-lg font-semibold p-1 rounded hover:bg-blue-600">
          My Playlists
          </a>
        </nav>

        <div className="mt-auto space-y-4  text-white">
          <a href="#" className="flex items-center text-lg font-semibold p-1 rounded hover:bg-blue-600">
            Settings
          </a>
          <a href="#" className="flex items-center text-lg font-semibold  p-1 rounded hover:bg-blue-600">
            Log Out
          </a>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
