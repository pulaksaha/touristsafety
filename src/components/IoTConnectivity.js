import React from 'react';
import { useNavigate } from 'react-router-dom';

const IoTConnectivity = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Emergency Alerts & SOS",
      description: "Panic button on wearables or mobile app with one-tap/manual and auto-trigger features. Instant E-FIR pre-fill with location & timestamp.",
      icon: "🆘",
      color: "#FF5252"
    },
    {
      title: "Real-Time Location Tracking",
      description: "GPS tracking via wearables or smartphone. Geo-fencing alerts if user enters unsafe zones. Live route sharing with family or authorities.",
      icon: "📍",
      color: "#4CAF50"
    },
    {
      title: "Live Audio/Video Proof",
      description: "Live streaming from smartphone or IoT camera for evidence. Automatic 30-second video capture on SOS trigger.",
      icon: "📹",
      color: "#2196F3"
    },
    {
      title: "Biometric & Health Monitoring",
      description: "Heart rate / stress level monitoring to detect panic. Fall or immobility detection for possible accident/assault.",
      icon: "❤️",
      color: "#9C27B0"
    },
    {
      title: "Connectivity with Vehicles & Transport",
      description: "Smart taxi/bus IoT integration for route verification. Auto-alert if vehicle deviates from planned path.",
      icon: "🚕",
      color: "#FF9800"
    },
    {
      title: "Smart Notifications",
      description: "Alerts to nearest police station/tourism helpdesk. SMS/email push to emergency contacts. Case status updates synced with E-FIR tracking.",
      icon: "🔔",
      color: "#00BCD4"
    }
  ];

  return (
    <div style={{ 
      padding: 20, 
      backgroundColor: "#0A1929",
      color: "white",
      minHeight: "100vh"
    }}>
      {/* Header with satellite orbit animation */}
      <div style={{
        position: "relative",
        padding: "30px 20px",
        textAlign: "center",
        marginBottom: "30px",
        overflow: "hidden"
      }}>
        {/* Animated satellite */}
        <div style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          width: "60px",
          height: "60px",
          animation: "orbit 20s linear infinite"
        }}>
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="15" fill="#0A1929" stroke="#4B9CD3" strokeWidth="2" />
            <circle cx="30" cy="30" r="5" fill="#4B9CD3" />
            <path d="M30,15 L30,5" stroke="#4B9CD3" strokeWidth="1" strokeDasharray="2,2" />
            <path d="M30,45 L30,55" stroke="#4B9CD3" strokeWidth="1" strokeDasharray="2,2" />
            <path d="M15,30 L5,30" stroke="#4B9CD3" strokeWidth="1" strokeDasharray="2,2" />
            <path d="M45,30 L55,30" stroke="#4B9CD3" strokeWidth="1" strokeDasharray="2,2" />
          </svg>
        </div>

        <button 
          onClick={() => navigate('/')}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            background: "none",
            border: "1px solid #4B9CD3",
            color: "#4B9CD3",
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            transition: "all 0.3s ease"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(75, 156, 211, 0.1)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          ← Back to Home
        </button>

        <h1 style={{ 
          fontSize: "2.5rem", 
          color: "white",
          marginBottom: "15px",
          textShadow: "0 2px 10px rgba(75, 156, 211, 0.5)"
        }}>IoT Device Connectivity</h1>
        
        <p style={{
          fontSize: "1.1rem",
          lineHeight: "1.6",
          color: "#B8C7D9",
          maxWidth: "800px",
          margin: "0 auto 25px"
        }}>
          Connect with smart devices via satellite networks for enhanced safety monitoring and real-time alerts.
          Our IoT solutions provide comprehensive safety features for tourists across India.
        </p>
      </div>

      {/* Features Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "25px",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px"
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
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.4)";
              e.currentTarget.style.borderColor = feature.color;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
              e.currentTarget.style.borderColor = "#1E3A5F";
            }}
          >
            {/* Signal animation in corner */}
            <div style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              width: "30px",
              height: "30px"
            }}>
              <svg width="30" height="30" viewBox="0 0 30 30">
                <path d="M5,20 Q15,5 25,20" stroke={feature.color} strokeWidth="2" fill="none" />
                <circle cx="15" cy="10" r="2" fill={feature.color} />
              </svg>
            </div>
            
            <div style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px"
            }}>
              <span style={{ 
                fontSize: "28px", 
                marginRight: "15px",
                backgroundColor: feature.color,
                color: "white",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 15px ${feature.color}40`
              }}>
                {feature.icon}
              </span>
              <h3 style={{
                fontSize: "1.3rem",
                color: "white",
                fontWeight: "600",
                margin: 0
              }}>
                {feature.title}
              </h3>
            </div>
            
            <p style={{
              fontSize: "0.95rem",
              lineHeight: "1.6",
              color: "#B8C7D9"
            }}>
              {feature.description}
            </p>
            
            <button style={{
              marginTop: "15px",
              padding: "8px 15px",
              backgroundColor: "transparent",
              color: feature.color,
              border: `1px solid ${feature.color}`,
              borderRadius: "5px",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = `${feature.color}20`;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}>
              Learn More
            </button>
          </div>
        ))}
      </div>

      {/* Add CSS for animations */}
      <style>
        {`
          @keyframes orbit {
            0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default IoTConnectivity;