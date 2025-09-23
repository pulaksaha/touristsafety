import React from 'react';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Smart Route Monitoring App</h1>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button style={buttonStyle}>Home</button>
        <button style={buttonStyle}>Automatic Mode</button>
        <button style={buttonStyle}>Manual Mode</button>
        <button style={buttonStyle}>Settings</button>
      </div>
      
      <div style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '20px', marginBottom: '20px' }}>
        <h2>Route Map</h2>
        <div style={{ height: '300px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Map will be displayed here
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <button style={buttonStyle}>Start Route</button>
        <button style={{ ...buttonStyle, backgroundColor: 'red' }}>SOS</button>
      </div>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px'
};

export default App;