import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import DigitalID from './components/DigitalID';

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#007BFF", color: "white"}}>
        <Link to="/" style={{ color: 'white', marginRight: 15 }}>Home</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/digital-id" element={<DigitalID />} />
      </Routes>
    </Router>
  );
}

export default App;