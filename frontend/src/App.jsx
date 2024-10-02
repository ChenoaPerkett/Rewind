import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SpalshPage from './pages/Spalsh';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<SpalshPage />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
