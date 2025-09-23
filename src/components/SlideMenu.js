import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
      title: '🗺️ Routing Plan',
      subItems: [
        'Route planning with checkpoints',
        'Geo-fencing for safety',
        'SOS alerts for missed checkpoints'
      ],
      action: () => navigate('/routing-plan')
    },
    {
      title: '👤 Profile',
      subItems: [
        'View/Edit personal info',
        'Upload/Update ID proofs (Passport, Aadhaar, etc.)',
        'Linked IoT devices'
      ],
      action: () => navigate('/profile')
    },
    {
      title: '⚙ Settings',
      subItems: [
        'App preferences (language, theme, notifications)',
        'Privacy & security options',
        'Manage emergency contacts'
      ],
      action: () => navigate('/settings')
    },
    {
      title: '💬 Feedback',
      subItems: [
        'Rate your experience',
        'Report bugs/suggestions'
      ],
      action: () => navigate('/feedback')
    },
    {
      title: '🚪 Logout',
      subItems: [
        'Safe logout with confirmation'
      ],
      action: () => alert('Logout functionality will be implemented')
    }
  ];

  const suggestedAdditions = [
    {
      title: '🛡 Safety Dashboard',
      subItems: [
        'Quick SOS button',
        'FIR Status tracking',
        'Live location sharing toggle'
      ],
      action: () => navigate('/safety-dashboard')
    },
    {
      title: '📜 My Reports',
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
        padding: '12px 15px',
        borderBottom: '1px solid rgba(30, 58, 95, 0.5)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backgroundColor: 'rgba(10, 25, 41, 0.8)',
        marginBottom: '8px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div 
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(75, 156, 211, 0.1) 0%, rgba(10, 25, 41, 0) 70%)',
          opacity: 0.5,
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'pulse 4s infinite'
        }}
      />
      <h3 style={{ 
        margin: '0 0 8px 0', 
        color: '#4B9CD3',
        fontSize: '16px',
        fontWeight: 'bold',
        position: 'relative',
        zIndex: 1
      }}>
        {item.title}
      </h3>
      <ul style={{ 
        margin: 0, 
        padding: '0 0 0 20px',
        fontSize: '14px',
        color: '#E0E0E0',
        position: 'relative',
        zIndex: 1
      }}>
        {item.subItems.map((subItem, idx) => (
          <li key={idx} style={{ marginBottom: '4px' }}>{subItem}</li>
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
          right: isOpen ? 0 : '-300px',
          width: '300px',
          height: '100vh',
          backgroundColor: '#0A1929',
          boxShadow: '-5px 0 15px rgba(0, 0, 0, 0.3)',
          transition: 'right 0.3s ease-in-out',
          zIndex: 1000,
          overflowY: 'auto',
          borderLeft: '1px solid #1E3A5F',
          background: 'linear-gradient(135deg, #102040 0%, #0A1929 100%)'
        }}
      >
        {/* Menu Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #1E3A5F',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <h2 style={{ 
            color: 'white', 
            margin: 0,
            fontSize: '1.5rem',
            textShadow: '0 2px 10px rgba(75, 156, 211, 0.5)'
          }}>
            Menu
          </h2>
          
          {/* Close button */}
          <button 
            onClick={toggleMenu}
            style={{
              background: 'none',
              border: 'none',
              color: '#4B9CD3',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '5px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '30px',
              height: '30px',
              transition: 'all 0.3s ease'
            }}
          >
            ×
          </button>
          
          {/* Satellite animation */}
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '50px',
            width: '20px',
            height: '20px'
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="5" fill="#0A1929" stroke="#4B9CD3" strokeWidth="1" />
              <circle cx="10" cy="10" r="2" fill="#4B9CD3" />
              <path d="M10,5 L10,2" stroke="#4B9CD3" strokeWidth="0.5" strokeDasharray="1,1" />
              <path d="M10,15 L10,18" stroke="#4B9CD3" strokeWidth="0.5" strokeDasharray="1,1" />
              <path d="M5,10 L2,10" stroke="#4B9CD3" strokeWidth="0.5" strokeDasharray="1,1" />
              <path d="M15,10 L18,10" stroke="#4B9CD3" strokeWidth="0.5" strokeDasharray="1,1" />
            </svg>
          </div>
        </div>
        
        {/* Core Features */}
        <div style={{ padding: '15px' }}>
          <h3 style={{ 
            color: '#4B9CD3', 
            fontSize: '18px',
            marginBottom: '15px',
            borderBottom: '1px solid #1E3A5F',
            paddingBottom: '5px'
          }}>
            Core Features
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {coreFeatures.map(renderMenuItem)}
          </div>
        </div>

        {/* Suggested Additions */}
        <div style={{ padding: '0 15px 15px' }}>
          <h3 style={{ 
            color: '#4B9CD3', 
            fontSize: '18px',
            marginBottom: '15px',
            borderBottom: '1px solid #1E3A5F',
            paddingBottom: '5px'
          }}>
            Suggested Additions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
            
            .menu-item:hover {
              background-color: rgba(30, 58, 95, 0.8) !important;
              transform: translateY(-2px);
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            }
          `}
        </style>
      </div>
    </>
  );
};

export default SlideMenu;