import React from "react";
import { MdQueueMusic } from "react-icons/md";
import { FaHome, FaSearch, FaMusic } from "react-icons/fa";
import { IoSettingsSharp, IoLogOutSharp } from "react-icons/io5";

export const HomeIcon = () => <FaHome className="text-2xl inline mr-1" />;
export const SearchIcon = () => <FaSearch className="text-2xl inline mr-1" />;
export const MusicIcon = () => <FaMusic className="text-xl inline mr-1" />;
export const QueueIcon = () => <MdQueueMusic className="text-2xl inline" />;
export const SettingsIcon = () => <IoSettingsSharp className="text-2xl inline mr-1" />;
export const LogOutIcon = () => <IoLogOutSharp className="text-2xl inline mr-1" />;
