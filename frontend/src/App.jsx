import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SpalshPage from './pages/Spalsh';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Home from './pages/Home';
class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<SpalshPage />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </Router>
    );
  }
}

export default App;
