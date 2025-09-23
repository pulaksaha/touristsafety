import React from 'react';
import { useNavigate } from 'react-router-dom';

const SocialConnect = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Trusted Circle Alerts",
      description: "Add emergency contacts (family, friends, embassy, local guide). Auto-alerts via SMS, WhatsApp, or Email with location & live updates when E-FIR or SOS is triggered.",
      icon: "👪",
      color: "#FF5252"
    },
    {
      title: "Community Safety Network",
      description: "Verified tourists can share real-time alerts about incidents. Access a community feed/map with safety tips, warnings, and updates.",
      icon: "🌐",
      color: "#4CAF50"
    },
    {
      title: "Embassy & Tourism Authority Linkage",
      description: "Direct communication with local embassies, tourism boards, and police. Automatic notification to embassy/consulate for foreign tourists.",
      icon: "🏛️",
      color: "#2196F3"
    },
    {
      title: "Live Social Check-ins",
      description: "Check-in safely at hotels, attractions, or rides. Receive automatic alerts if check-in is missed beyond a set time.",
      icon: "📍",
      color: "#9C27B0"
    },
    {
      title: "Traveler-to-Traveler Assistance",
      description: "Connect with travelers in the same region for peer support. Nearby verified tourists can volunteer emergency help before authorities arrive.",
      icon: "🤝",
      color: "#FF9800"
    },
    {
      title: "Incident Sharing & Awareness",
      description: "Share anonymized incidents on social media to spread awareness. Use hashtag-based reporting for better visibility.",
      icon: "📢",
      color: "#00BCD4"
    },
    {
      title: "Review & Feedback System",
      description: "Rate locations, guides, taxis, hotels on safety measures. View safety index before traveling to make informed decisions.",
      icon: "⭐",
      color: "#673AB7"
    },
    {
      title: "Multilingual Chat Support",
      description: "AI + human hybrid support in multiple languages. Connect instantly with local volunteers or safety officers.",
      icon: "💬",
      color: "#E91E63"
    },
    {
      title: "Group Travel Safety Mode",
      description: "Tour groups can stay connected via IoT wearables/app. Receive alerts if a member strays too far or faces an issue.",
      icon: "👥",
      color: "#3F51B5"
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
        }}>Social Connect</h1>
        
        <p style={{
          fontSize: "1.1rem",
          lineHeight: "1.6",
          color: "#B8C7D9",
          maxWidth: "800px",
          margin: "0 auto 25px"
        }}>
          Stay connected with a network of trusted contacts, fellow travelers, and authorities.
          Our social safety features ensure you're never alone during your journey across India.
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
            {/* Connection animation in corner */}
            <div style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              width: "30px",
              height: "30px"
            }}>
              <svg width="30" height="30" viewBox="0 0 30 30">
                <circle cx="15" cy="15" r="5" fill="none" stroke={feature.color} strokeWidth="1">
                  <animate attributeName="r" values="5;10;5" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="15" cy="15" r="10" fill="none" stroke={feature.color} strokeWidth="1">
                  <animate attributeName="r" values="10;15;10" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.5;0.2;0.5" dur="3s" repeatCount="indefinite" />
                </circle>
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

export default SocialConnect;