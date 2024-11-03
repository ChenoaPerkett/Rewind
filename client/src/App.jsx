import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Search from './pages/Search';
import Splash from './pages/Splash';
import Profile from './pages/Profile';
import Login from './pages/auth/Login';
import Playlist from './pages/Playlist';
import Settings from './pages/Settings';
import Logout from './pages/auth/Logout';
import Register from './pages/auth/Register';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Splash />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/playlist/:id"
            element={
              <ProtectedRoute>
                <Playlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logout"
            element={
              <ProtectedRoute>
                <Logout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    );
  }
}

export default App;
