import React from "react";
import { HomeIcon, SearchIcon, SettingsIcon, LogOutIcon } from "../components/icons";

class Sidebar extends React.Component {
    render() {
        return (
            <aside className=" bg-blue-950 p-8 flex flex-col">
                <div className="flex items-center mb-4">
                    <img src="/assets/images/logo.png" alt="rewind logo" className="h-10 w-10 mr-2" />
                    <h1 className="text-3xl font-bold text-white">Rewind</h1>
                </div>

                <div className="flex flex-col items-center">
                    <div className="bg-blue-600 rounded-full h-16 w-16 mb-2"></div>
                    <h2 className="text-xl font-bold text-white">User Name</h2>
                </div>

                <hr className="my-4" />

                <nav className="space-y-4  text-white">
                    <a href="#" className="block text-lg font-semibold p-1 rounded hover:bg-blue-600">
                        <HomeIcon />  Home
                    </a>

                    <a href="#" className="block text-lg font-semibold p-1 rounded hover:bg-blue-600">
                        <SearchIcon />  Search
                    </a>
                </nav>

                <div className="mt-auto space-y-4  text-white">
                    <a href="#" className="flex items-center text-lg font-semibold p-1 rounded hover:bg-blue-600">
                        <SettingsIcon />  Settings
                    </a>
                    <a href="#" className="flex items-center text-lg font-semibold  p-1 rounded hover:bg-blue-600">
                        <LogOutIcon />   Log Out
                    </a>
                </div>
            </aside>
        );
    }
}

export default Sidebar;
