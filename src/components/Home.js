import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // Feature card data
  const features = [
    {
      title: "Routing Plan & Geo-fencing",
      description: "Navigate safely with satellite-powered route planning and geo-fencing to keep you within secure boundaries.",
      icon: `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='38' fill='%23102040' stroke='%234B9CD3' stroke-width='2'/%3E%3Cpath d='M20,50 Q40,20 60,50' stroke='%234B9CD3' stroke-width='2' fill='none'/%3E%3Ccircle cx='20' cy='50' r='5' fill='%234B9CD3'/%3E%3Ccircle cx='60' cy='50' r='5' fill='%234B9CD3'/%3E%3Cpath d='M30,45 Q40,30 50,45' stroke='white' stroke-width='1' fill='none' stroke-dasharray='2,2'/%3E%3Ccircle cx='40' cy='25' r='3' fill='white'/%3E%3Cpath d='M40,25 L40,15' stroke='white' stroke-width='1' stroke-dasharray='2,2'/%3E%3C/svg%3E`,
      path: "/routing-plan"
    },
    {
      title: "IoT Device Connectivity",
      description: "Connect with smart devices via satellite networks for enhanced safety monitoring and real-time alerts.",
      icon: `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='38' fill='%23102040' stroke='%234B9CD3' stroke-width='2'/%3E%3Ccircle cx='40' cy='40' r='8' fill='%234B9CD3'/%3E%3Cpath d='M40,40 L55,25' stroke='white' stroke-width='1'/%3E%3Ccircle cx='55' cy='25' r='4' fill='white'/%3E%3Cpath d='M40,40 L25,25' stroke='white' stroke-width='1'/%3E%3Ccircle cx='25' cy='25' r='4' fill='white'/%3E%3Cpath d='M40,40 L55,55' stroke='white' stroke-width='1'/%3E%3Ccircle cx='55' cy='55' r='4' fill='white'/%3E%3Cpath d='M40,40 L25,55' stroke='white' stroke-width='1'/%3E%3Ccircle cx='25' cy='55' r='4' fill='white'/%3E%3Cpath d='M30,30 Q40,20 50,30' stroke='%234B9CD3' stroke-width='1' fill='none' stroke-dasharray='2,2'/%3E%3Cpath d='M30,50 Q40,60 50,50' stroke='%234B9CD3' stroke-width='1' fill='none' stroke-dasharray='2,2'/%3E%3C/svg%3E`,
      path: "/iot-connectivity"
    },
    {
      title: "Social Connect",
      description: "Stay connected with your community through satellite-powered communication networks, even in remote areas.",
      icon: `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='38' fill='%23102040' stroke='%234B9CD3' stroke-width='2'/%3E%3Ccircle cx='30' cy='30' r='6' fill='white'/%3E%3Ccircle cx='50' cy='30' r='6' fill='white'/%3E%3Ccircle cx='40' cy='55' r='6' fill='white'/%3E%3Cpath d='M30,30 L50,30 L40,55 Z' stroke='%234B9CD3' stroke-width='2' fill='none'/%3E%3Cpath d='M40,15 Q50,25 40,35' stroke='white' stroke-width='1' fill='none' stroke-dasharray='2,2'/%3E%3Ccircle cx='40' cy='15' r='3' fill='%234B9CD3'/%3E%3C/svg%3E`,
      path: "/social-connect"
    },
    {
      title: "E-Filing",
      description: "Securely file and transmit documents via encrypted satellite channels for immediate assistance and verification.",
      icon: `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='38' fill='%23102040' stroke='%234B9CD3' stroke-width='2'/%3E%3Crect x='25' y='30' width='30' height='35' rx='2' fill='white'/%3E%3Cpath d='M30,40 L50,40' stroke='%234B9CD3' stroke-width='2'/%3E%3Cpath d='M30,45 L50,45' stroke='%234B9CD3' stroke-width='2'/%3E%3Cpath d='M30,50 L40,50' stroke='%234B9CD3' stroke-width='2'/%3E%3Cpath d='M40,15 L40,30' stroke='white' stroke-width='1' stroke-dasharray='2,2'/%3E%3Ccircle cx='40' cy='15' r='3' fill='%234B9CD3'/%3E%3Cpath d='M25,25 L35,30' stroke='white' stroke-width='1' stroke-dasharray='2,2'/%3E%3Ccircle cx='25' cy='25' r='2' fill='white'/%3E%3C/svg%3E`,
      path: "/e-filing"
    }
  ];

  return (
    <div style={{ 
      padding: 20, 
      textAlign: "center",
      maxWidth: "1200px",
      margin: "0 auto",
      backgroundColor: "#0A1929",
      color: "white",
      minHeight: "100vh"
    }}>
      <div style={{
        background: "linear-gradient(135deg, #102040 0%, #0A1929 100%)",
        padding: "30px 20px",
        borderRadius: "10px",
        marginBottom: "30px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        border: "1px solid #1E3A5F"
      }}>
        <h1 style={{ 
          fontSize: "2.5rem", 
          color: "white",
          marginBottom: "20px",
          textShadow: "0 2px 10px rgba(75, 156, 211, 0.5)"
        }}>Safety Monitoring System</h1>
        <p style={{
          fontSize: "1.1rem",
          lineHeight: "1.6",
          color: "#B8C7D9",
          maxWidth: "800px",
          margin: "0 auto 25px"
        }}>
          Advanced AI-powered safety monitoring with blockchain-secured digital IDs, real-time incident tracking, 
          and multilingual emergency support to keep tourists secure across India.
        </p>
        <div style={{ marginBottom: "20px" }}>
          <button
            style={{ 
              padding: "12px 25px", 
              marginRight: "15px", 
              background: "linear-gradient(135deg, #4B9CD3 0%, #1976D2 100%)",
              color: "white", 
              border: "none", 
              borderRadius: "5px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 10px rgba(75, 156, 211, 0.5)"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            onClick={() => navigate("/register")}
          >
            Register Now
          </button>
          <button
            style={{ 
              padding: "12px 25px", 
              background: "linear-gradient(135deg, #FF5252 0%, #D32F2F 100%)",
              color: "white", 
              border: "none", 
              borderRadius: "5px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 10px rgba(255, 82, 82, 0.5)"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            onClick={() => alert("Emergency Alert triggered!")}
          >
            Emergency Alert
          </button>
        </div>
      </div>
      
      {/* Feature Cards Section */}
      <div style={{
        position: "relative",
        padding: "20px 0 40px",
        overflow: "hidden"
      }}>
        {/* Background satellite orbit lines */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          background: `radial-gradient(circle at center, transparent 0%, transparent 20%, rgba(75, 156, 211, 0.03) 21%, rgba(75, 156, 211, 0.03) 30%, transparent 31%, transparent 50%, rgba(75, 156, 211, 0.03) 51%, rgba(75, 156, 211, 0.03) 60%, transparent 61%)`
        }}></div>
        
        <h2 style={{ 
          fontSize: "1.8rem", 
          color: "white",
          marginBottom: "30px",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          textTransform: "uppercase",
          letterSpacing: "2px",
          fontWeight: "600"
        }}>
          <span style={{
            position: "relative",
            display: "inline-block",
            padding: "0 15px"
          }}>
            Our Core Features
            <span style={{
              position: "absolute",
              bottom: "-10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "60px",
              height: "3px",
              background: "linear-gradient(90deg, transparent, #4B9CD3, transparent)",
              borderRadius: "3px"
            }}></span>
          </span>
        </h2>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px",
          position: "relative",
          zIndex: 1
        }}>
          {features.map((feature, index) => (
            <div 
              key={index}
              style={{
                background: "linear-gradient(135deg, #102040 0%, #0A1929 100%)",
                borderRadius: "10px",
                padding: "25px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                border: "1px solid #1E3A5F",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.4)";
                e.currentTarget.style.borderColor = "#4B9CD3";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
                e.currentTarget.style.borderColor = "#1E3A5F";
              }}
              onClick={() => {
                if (feature.path) {
                  navigate(feature.path);
                }
              }}
            >
              {/* Glowing dot in corner */}
              <div style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#4B9CD3",
                boxShadow: "0 0 10px 2px rgba(75, 156, 211, 0.7)",
                animation: "pulse 2s infinite"
              }}></div>
              
              <div style={{
                marginBottom: "20px",
                width: "80px",
                height: "80px"
              }}>
                <img 
                  src={feature.icon} 
                  alt={feature.title}
                  style={{width: "100%", height: "100%"}}
                />
              </div>
              
              <h3 style={{
                fontSize: "1.3rem",
                marginBottom: "15px",
                color: "white",
                fontWeight: "600"
              }}>
                {feature.title}
              </h3>
              
              <p style={{
                fontSize: "0.95rem",
                lineHeight: "1.6",
                color: "#B8C7D9",
                textAlign: "center"
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add CSS for animations */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
          }
        `}
      </style>
    </div>
  );
};

export default Home;