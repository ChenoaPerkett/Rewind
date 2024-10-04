import React from "react";
import { Link } from "react-router-dom";

import { HomeIcon, SearchIcon, LogOutIcon } from "./Icons";

class Sidebar extends React.Component {
    render() {
        return (
            <aside className=" bg-blue-950 w-1/6 p-8 flex flex-col">
                <Link to="/profile" className="flex flex-col items-center">
                    <div className="bg-blue-600 rounded-full h-24 w-24 mb-2"></div>
                    <h2 className="text-xl font-bold text-white">User Name</h2>
                </Link>

                <hr className="my-4" />

                <nav className="space-y-4  text-white">

                    <Link to="/home" className="block text-lg font-semibold p-1 rounded hover:bg-blue-600">
                        <HomeIcon />Home
                    </Link>

                    <Link to="/search" className="block text-lg font-semibold p-1 rounded hover:bg-blue-600">
                        <SearchIcon />  Search
                    </Link>
                </nav>

                <Link to="/logout" className="flex items-center mt-auto space-y-4  text-white text-lg font-semibold  p-1 rounded hover:bg-blue-600">
                    <LogOutIcon />   Log Out
                </Link>
            </aside>
        );
    }
}

export default Sidebar;
