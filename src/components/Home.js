import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h1>Safety Monitoring System</h1>
      <p>
        Advanced AI-powered safety monitoring with blockchain-secured digital IDs, real-time incident tracking, 
        and multilingual emergency support to keep tourists secure across India.
      </p>
      <button
        style={{ padding: 10, marginRight: 10, backgroundColor: "#0056b3", color: "white", border: "none", borderRadius: 5 }}
        onClick={() => navigate("/register")}
      >
        Register Now
      </button>
      <button
        style={{ padding: 10, backgroundColor: "red", color: "white", border: "none", borderRadius: 5 }}
        onClick={() => alert("Emergency Alert triggered!")}
      >
        Emergency Alert
      </button>
    </div>
  );
};

export default Home;