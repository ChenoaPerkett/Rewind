import React from "react";

class Header extends React.Component {
    render() {
        return (
            <header className="flex items-center justify-center p-4 bg-white shadow-md">
                <div className="flex space-x-4">
                    <button className="p-2 text-gray-700">Playlists</button>
                    <button className="p-2 bg-gray-200 rounded">Songs</button>
                </div>
            </header>
        );
    }
}

export default Header;
