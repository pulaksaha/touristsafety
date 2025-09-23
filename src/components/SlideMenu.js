import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserAstronaut, FaCog, FaCommentDots, FaDoorOpen, FaShieldAlt, FaScroll, FaMapMarkedAlt } from 'react-icons/fa';

const SlideMenu = ({ isOpen, toggleMenu }) => {
  const navigate = useNavigate();
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && e.target.classList.contains('menu-overlay')) {
        toggleMenu();
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen, toggleMenu]);

  // Core Features and Suggested Additions
  const coreFeatures = [
    {
      title: 'Routing Plan',
      icon: <FaMapMarkedAlt />,
      subItems: [
        'Route planning with checkpoints',
        'Geo-fencing for safety',
        'SOS alerts for missed checkpoints'
      ],
      action: () => navigate('/routing-plan')
    },
    {
      title: 'Profile',
      icon: <FaUserAstronaut />,
      subItems: [
        'View/Edit personal info',
        'Upload/Update ID proofs (Passport, Aadhaar, etc.)',
        'Linked IoT devices'
      ],
      action: () => navigate('/profile')
    },
    {
      title: 'Settings',
      icon: <FaCog />,
      subItems: [
        'App preferences (language, theme, notifications)',
        'Privacy & security options',
        'Manage emergency contacts'
      ],
      action: () => navigate('/settings')
    },
    {
      title: 'Feedback',
      icon: <FaCommentDots />,
      subItems: [
        'Rate your experience',
        'Report bugs/suggestions'
      ],
      action: () => navigate('/feedback')
    },
    {
      title: 'Logout',
      icon: <FaDoorOpen />,
      subItems: [
        'Safe logout with confirmation'
      ],
      action: () => alert('Logout functionality will be implemented')
    }
  ];

  const suggestedAdditions = [
    {
      title: 'Safety Dashboard',
      icon: <FaShieldAlt />,
      subItems: [
        'Quick SOS button',
        'FIR Status tracking',
        'Live location sharing toggle'
      ],
      action: () => navigate('/safety-dashboard')
    },
    {
      title: 'My Reports',
      icon: <FaScroll />,
      subItems: [
        'View past reports & their statuses',
        'Download FIR copy'
      ],
      action: () => navigate('/my-reports')
    }
  ];
  
  // Render menu item
  const renderMenuItem = (item, index) => (
    <div 
      key={index} 
      className="menu-item"
      onClick={item.action}
      style={{
        padding: '15px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        background: 'linear-gradient(135deg, rgba(10, 25, 41, 0.9) 0%, rgba(30, 58, 95, 0.7) 100%)',
        marginBottom: '12px',
        borderRadius: '8px',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.3), 0 0 5px rgba(79, 195, 247, 0.2) inset',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(79, 195, 247, 0.2)'
      }}
    >
      {/* Radar scan effect */}
      <div 
        className="radar-scan"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '200%',
          height: '200%',
          background: 'conic-gradient(rgba(79, 195, 247, 0.1) 0%, transparent 20%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'radarScan 4s linear infinite'
        }}
      />
      
      {/* Orbit path */}
      <div 
        className="orbit-path"
        style={{
          position: 'absolute',
          top: '50%',
          left: '0',
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(79, 195, 247, 0.3) 50%, transparent 100%)',
          opacity: 0.5,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '8px'
      }}>
        {/* Icon with glow effect */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'rgba(10, 25, 41, 0.8)',
          boxShadow: '0 0 10px rgba(79, 195, 247, 0.5)',
          border: '1px solid rgba(79, 195, 247, 0.3)',
          color: '#4fc3f7',
          fontSize: '18px'
        }}>
          {item.icon}
        </div>
        
        <h3 style={{ 
          margin: 0, 
          color: '#4fc3f7',
          fontSize: '16px',
          fontWeight: 'bold',
          position: 'relative',
          zIndex: 1,
          textShadow: '0 0 5px rgba(79, 195, 247, 0.5)',
          fontFamily: '"Rajdhani", sans-serif',
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          {item.title}
        </h3>
      </div>
      
      <ul style={{ 
        margin: 0, 
        padding: '0 0 0 48px',
        fontSize: '13px',
        color: '#b0bec5',
        position: 'relative',
        zIndex: 1,
        listStyleType: 'none'
      }}>
        {item.subItems.map((subItem, idx) => (
          <li key={idx} style={{ 
            marginBottom: '6px',
            position: 'relative'
          }}>
            <span style={{
              position: 'absolute',
              left: '-15px',
              top: '6px',
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: '#4fc3f7',
              boxShadow: '0 0 5px rgba(79, 195, 247, 0.7)'
            }}></span>
            {subItem}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="menu-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            backdropFilter: 'blur(3px)'
          }}
        />
      )}
      
      {/* Slide Menu */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          right: isOpen ? 0 : '-350px',
          width: '350px',
          height: '100vh',
          backgroundColor: '#0A1929',
          boxShadow: '-5px 0 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(79, 195, 247, 0.3)',
          transition: 'right 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          zIndex: 1000,
          overflowY: 'auto',
          borderLeft: '1px solid rgba(79, 195, 247, 0.3)',
          background: 'linear-gradient(135deg, #0a1929 0%, #0d2b46 100%)',
          backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(25, 118, 210, 0.1) 0%, transparent 25%), radial-gradient(circle at 85% 30%, rgba(79, 195, 247, 0.1) 0%, transparent 20%)'
        }}
      >
        {/* Menu Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid rgba(79, 195, 247, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(90deg, rgba(10, 25, 41, 0.9) 0%, rgba(25, 118, 210, 0.2) 100%)'
        }}>
          <h2 style={{ 
            color: '#4fc3f7', 
            margin: 0,
            fontSize: '1.5rem',
            textShadow: '0 0 10px rgba(79, 195, 247, 0.7)',
            fontFamily: '"Orbitron", sans-serif',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            Command Center
          </h2>
          
          {/* Close button */}
          <button 
            onClick={toggleMenu}
            style={{
              background: 'rgba(10, 25, 41, 0.8)',
              border: '1px solid rgba(79, 195, 247, 0.5)',
              color: '#4fc3f7',
              fontSize: '1.2rem',
              cursor: 'pointer',
              padding: '5px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '30px',
              height: '30px',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 10px rgba(79, 195, 247, 0.3)'
            }}
          >
            ×
          </button>
          
          {/* Satellite animation */}
          <div className="satellite-container" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            opacity: 0.2
          }}>
            {/* Orbit paths */}
            <div className="orbit" style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              border: '1px dashed rgba(79, 195, 247, 0.3)',
              transform: 'translate(-50%, -50%)'
            }}></div>
            
            <div className="orbit" style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              border: '1px dashed rgba(79, 195, 247, 0.5)',
              transform: 'translate(-50%, -50%)'
            }}></div>
            
            {/* Satellite */}
            <div className="satellite" style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '10px',
              height: '10px',
              background: '#4fc3f7',
              borderRadius: '50%',
              boxShadow: '0 0 10px rgba(79, 195, 247, 0.7)',
              transform: 'translate(-50%, -50%)',
              animation: 'orbitAnimation 10s linear infinite'
            }}></div>
          </div>
        </div>
        
        {/* Core Features */}
        <div style={{ padding: '20px' }}>
          <h3 style={{ 
            color: '#4fc3f7', 
            fontSize: '16px',
            marginBottom: '15px',
            borderBottom: '1px solid rgba(79, 195, 247, 0.3)',
            paddingBottom: '8px',
            fontFamily: '"Rajdhani", sans-serif',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#4fc3f7',
              boxShadow: '0 0 8px rgba(79, 195, 247, 0.8)'
            }}></span>
            Primary Systems
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {coreFeatures.map(renderMenuItem)}
          </div>
        </div>

        {/* Suggested Additions */}
        <div style={{ padding: '0 20px 20px' }}>
          <h3 style={{ 
            color: '#4fc3f7', 
            fontSize: '16px',
            marginBottom: '15px',
            borderBottom: '1px solid rgba(79, 195, 247, 0.3)',
            paddingBottom: '8px',
            fontFamily: '"Rajdhani", sans-serif',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#4fc3f7',
              boxShadow: '0 0 8px rgba(79, 195, 247, 0.8)'
            }}></span>
            Auxiliary Systems
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {suggestedAdditions.map(renderMenuItem)}
          </div>
        </div>
        
        {/* Add CSS for animations */}
        <style>
          {`
            @keyframes pulse {
              0% { opacity: 0.3; }
              50% { opacity: 0.7; }
              100% { opacity: 0.3; }
            }
            
            @keyframes radarScan {
              0% { transform: translate(-50%, -50%) rotate(0deg); }
              100% { transform: translate(-50%, -50%) rotate(360deg); }
            }
            
            @keyframes orbitAnimation {
              0% { transform: rotate(0deg) translateX(50px) rotate(0deg); }
              100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
            }
            
            @keyframes glowPulse {
              0% { box-shadow: 0 0 5px rgba(79, 195, 247, 0.3); }
              50% { box-shadow: 0 0 15px rgba(79, 195, 247, 0.7); }
              100% { box-shadow: 0 0 5px rgba(79, 195, 247, 0.3); }
            }
            
            .menu-item:hover {
              background: linear-gradient(135deg, rgba(25, 118, 210, 0.4) 0%, rgba(30, 58, 95, 0.7) 100%) !important;
              transform: translateY(-2px);
              box-shadow: 0 0 20px rgba(79, 195, 247, 0.4), 0 0 10px rgba(79, 195, 247, 0.3) inset !important;
              border: 1px solid rgba(79, 195, 247, 0.5) !important;
            }
            
            .satellite {
              animation: orbitAnimation 10s linear infinite;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default SlideMenu;