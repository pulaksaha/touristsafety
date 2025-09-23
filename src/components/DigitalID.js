import React from 'react';
import { useLocation, Link } from 'react-router-dom';

// For QR code generation, let's use a library like 'qrcode.react'
import { QRCodeSVG } from 'qrcode.react'; 

const DigitalID = () => {
  const location = useLocation();
  const fullName = location.state?.fullName || 'User';

  // Generate a sample tourist ID
  const touristId = `TOUR${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>Your digital tourist ID has been generated successfully.</h2>
      <div>
        <img 
          src="https://cdn-icons-png.flaticon.com/512/147/147142.png" 
          alt={`${fullName} avatar`} 
          style={{ height: 100, borderRadius: '50%', margin: "20px 0" }} 
        />
      </div>
      <h3>{fullName}</h3>
      <p>Tourist ID: <strong>{touristId}</strong></p>
      <QRCodeSVG value={touristId} size={185} />
      <div style={{ marginTop: 20 }}>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default DigitalID;