import React from "react";
import { Link } from "react-router-dom";

import { SettingsIcon } from "./Icons";


class Header extends React.Component {
    render() {
        return (
            <header className="flex items-center justify-between p-4 bg-white shadow-md">

                <div className="flex items-center mb-4">
                    <img src="/assets/images/logo.png" alt="rewind logo" className="h-10 w-10 mr-2" />
                    <h1 className="text-3xl font-bold">Rewind</h1>
                </div>

                <div className="flex space-x-4">
                    
                    <button className="p-2 text-gray-700 rounded-full hover:text-white min-w-24 hover:bg-blue-400">Playlists</button>
                    <button className="p-2 bg-blue-950 rounded-full text-white min-w-24">Songs</button>
                </div>
                <div className="flex space-x-4"></div>

                <Link to="/settings" className="flex text-lg font-semibold p-1">
                    <SettingsIcon />
                </Link>
            </header>
        );
    }
}

export default Header;
