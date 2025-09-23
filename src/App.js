import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import DigitalID from './components/DigitalID';
import IoTConnectivity from './components/IoTConnectivity';
import SocialConnect from './components/SocialConnect';
import EFiling from './components/EFiling';
import SlideMenu from './components/SlideMenu';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <nav style={{ 
        padding: "10px 20px", 
        background: "linear-gradient(90deg, #0A1929, #102040)",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #1E3A5F"
      }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '10px'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="none" stroke="#4B9CD3" strokeWidth="2" />
              <circle cx="12" cy="12" r="3" fill="#4B9CD3" />
            </svg>
            <span style={{ fontWeight: 'bold' }}>SafetyNet</span>
          </div>
        </Link>
        <div 
          onClick={toggleMenu}
          style={{ 
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '20px',
            width: '25px',
            padding: '2px'
          }}
        >
          <div style={{ height: '2px', width: '100%', backgroundColor: 'white' }}></div>
          <div style={{ height: '2px', width: '100%', backgroundColor: 'white' }}></div>
          <div style={{ height: '2px', width: '100%', backgroundColor: 'white' }}></div>
        </div>
      </nav>
      
      {/* Slide Menu */}
      <SlideMenu isOpen={menuOpen} toggleMenu={toggleMenu} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/digital-id" element={<DigitalID />} />
        <Route path="/iot-connectivity" element={<IoTConnectivity />} />
        <Route path="/social-connect" element={<SocialConnect />} />
        <Route path="/e-filing" element={<EFiling />} />
      </Routes>
    </Router>
  );
}

export default App;