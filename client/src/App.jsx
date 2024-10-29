import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Search from './pages/Search';
import Spalsh from './pages/Spalsh';
import Profile from './pages/Profile';
import Login from './pages/auth/Login';
import Settings from './pages/Settings';
import Logout from './pages/auth/Logout';
import Register from './pages/auth/Register';
import Playlist from './pages/Playlist';


class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Spalsh />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/playlist" element={<Playlist/>} />
  
        </Routes>
      </Router>
    );
  }
}

export default App;
