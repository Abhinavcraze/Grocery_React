import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Store from './pages/Store';
import Tracking from './pages/Tracking';
import Rider from './pages/Rider';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/store" element={<Store />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/rider" element={<Rider />} />
      </Routes>
    </Router>
  );
}

export default App;