import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaMapMarkedAlt, FaComments, FaSatelliteDish, FaUserFriends, FaUserPlus, FaBell, FaSearch, FaShareAlt, FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import BhuvanAPI from '../services/BhuvanAPI';

const SocialConnect = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('features');
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [newFriendEmail, setNewFriendEmail] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [sharingLocation, setSharingLocation] = useState(false);
  const [viewingFriendId, setViewingFriendId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const bhuvanApiRef = useRef(new BhuvanAPI("b2946070ae0db8820e7637642d023451250b6c25"));
  const locationIntervalRef = useRef(null);
  
  // Mock user data
  const currentUser = {
    id: 'user123',
    name: 'Current User',
    email: 'user@example.com',
    profilePic: 'https://randomuser.me/api/portraits/men/1.jpg'
  };
  
  // Mock friends data
  const mockFriends = [
    {
      id: 'friend1',
      name: 'Rahul Sharma',
      email: 'rahul@example.com',
      profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
      location: {
        latitude: 28.6129,
        longitude: 77.2295,
        lastUpdated: new Date().toISOString()
      },
      isSharing: true,
      status: 'online'
    },
    {
      id: 'friend2',
      name: 'Priya Patel',
      email: 'priya@example.com',
      profilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
      location: {
        latitude: 28.6219,
        longitude: 77.2190,
        lastUpdated: new Date(Date.now() - 15 * 60000).toISOString()
      },
      isSharing: true,
      status: 'offline'
    },
    {
      id: 'friend3',
      name: 'Amit Kumar',
      email: 'amit@example.com',
      profilePic: 'https://randomuser.me/api/portraits/men/67.jpg',
      location: null,
      isSharing: false,
      status: 'online'
    }
  ];
  
  // Mock friend requests
  const mockFriendRequests = [
    {
      id: 'request1',
      name: 'Neha Gupta',
      email: 'neha@example.com',
      profilePic: 'https://randomuser.me/api/portraits/women/22.jpg',
      sentAt: new Date(Date.now() - 2 * 3600000).toISOString()
    },
    {
      id: 'request2',
      name: 'Vikram Singh',
      email: 'vikram@example.com',
      profilePic: 'https://randomuser.me/api/portraits/men/45.jpg',
      sentAt: new Date(Date.now() - 24 * 3600000).toISOString()
    }
  ];
  
  useEffect(() => {
    // Initialize friends and requests
    setFriends(mockFriends);
    setFriendRequests(mockFriendRequests);
    
    // Get current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          lastUpdated: new Date().toISOString()
        });
      },
      (error) => {
        console.error('Error getting location:', error);
        // Default location (New Delhi)
        setCurrentLocation({
          latitude: 28.6139,
          longitude: 77.2090,
          lastUpdated: new Date().toISOString()
        });
      }
    );
    
    // Initialize Bhuvan API
    const initBhuvanAPI = async () => {
      try {
        await bhuvanApiRef.current.authenticate();
        console.log('Bhuvan API authenticated successfully for social connect');
      } catch (error) {
        console.error('Failed to authenticate with Bhuvan API:', error);
      }
    };
    
    initBhuvanAPI();
    
    return () => {
      // Clean up location tracking
      if (locationIntervalRef.current) {
        clearInterval(locationIntervalRef.current);
      }
    };
  }, []);
  
  // Start or stop sharing location
  const toggleLocationSharing = () => {
    if (!sharingLocation) {
      // Start sharing location
      locationIntervalRef.current = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              lastUpdated: new Date().toISOString()
            };
            setCurrentLocation(newLocation);
            // In a real app, this would send the location to a server
            console.log('Sharing location:', newLocation);
          },
          (error) => {
            console.error('Error updating location:', error);
          }
        );
      }, 30000); // Update every 30 seconds
    } else {
      // Stop sharing location
      if (locationIntervalRef.current) {
        clearInterval(locationIntervalRef.current);
        locationIntervalRef.current = null;
      }
    }
    setSharingLocation(!sharingLocation);
  };
  
  // Send friend request
  const sendFriendRequest = () => {
    if (!newFriendEmail) return;
    
    // In a real app, this would send a request to the server
    alert(`Friend request sent to ${newFriendEmail}`);
    setNewFriendEmail('');
  };
  
  // Accept friend request
  const acceptFriendRequest = (requestId) => {
    // Find the request
    const request = friendRequests.find(req => req.id === requestId);
    if (!request) return;
    
    // Add to friends
    const newFriend = {
      id: request.id,
      name: request.name,
      email: request.email,
      profilePic: request.profilePic,
      location: null,
      isSharing: false,
      status: 'online'
    };
    
    setFriends([...friends, newFriend]);
    
    // Remove from requests
    setFriendRequests(friendRequests.filter(req => req.id !== requestId));
    
    // In a real app, this would update the server
    alert(`You are now friends with ${request.name}`);
  };
  
  // Reject friend request
  const rejectFriendRequest = (requestId) => {
    // Remove from requests
    setFriendRequests(friendRequests.filter(req => req.id !== requestId));
    
    // In a real app, this would update the server
    alert('Friend request rejected');
  };
  
  // View friend's location
  const viewFriendLocation = (friendId) => {
    setViewingFriendId(friendId);
    setActiveTab('map');
  };
  
  // Filter friends by search query
  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    friend.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

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

  // Calculate distance between two points in km
  const calculateDistance = (point1, point2) => {
    if (!point1 || !point2) return 0;
    
    const R = 6371; // Radius of the Earth in km
    const dLat = (point2.latitude - point1.latitude) * Math.PI / 180;
    const dLon = (point2.longitude - point1.longitude) * Math.PI / 180;
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(point1.latitude * Math.PI / 180) * Math.cos(point2.latitude * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in km
    
    return distance;
  };

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

      {/* Navigation Tabs */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "30px",
        borderBottom: "1px solid #1E3A5F",
        padding: "0 20px"
      }}>
        <button 
          onClick={() => setActiveTab('features')}
          style={{
            background: "none",
            border: "none",
            color: activeTab === 'features' ? "#4B9CD3" : "#B8C7D9",
            padding: "10px 20px",
            fontSize: "1rem",
            cursor: "pointer",
            position: "relative",
            borderBottom: activeTab === 'features' ? "2px solid #4B9CD3" : "none",
            marginBottom: "-1px"
          }}
        >
          <FaUsers style={{ marginRight: "8px" }} /> Features
        </button>
        
        <button 
          onClick={() => setActiveTab('friends')}
          style={{
            background: "none",
            border: "none",
            color: activeTab === 'friends' ? "#4B9CD3" : "#B8C7D9",
            padding: "10px 20px",
            fontSize: "1rem",
            cursor: "pointer",
            position: "relative",
            borderBottom: activeTab === 'friends' ? "2px solid #4B9CD3" : "none",
            marginBottom: "-1px"
          }}
        >
          <FaUserFriends style={{ marginRight: "8px" }} /> Friends
        </button>
        
        <button 
          onClick={() => setActiveTab('requests')}
          style={{
            background: "none",
            border: "none",
            color: activeTab === 'requests' ? "#4B9CD3" : "#B8C7D9",
            padding: "10px 20px",
            fontSize: "1rem",
            cursor: "pointer",
            position: "relative",
            borderBottom: activeTab === 'requests' ? "2px solid #4B9CD3" : "none",
            marginBottom: "-1px",
            display: "flex",
            alignItems: "center"
          }}
        >
          <FaBell style={{ marginRight: "8px" }} /> Requests 
          {friendRequests.length > 0 && (
            <span style={{
              backgroundColor: "#FF5252",
              color: "white",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.8rem",
              marginLeft: "8px"
            }}>
              {friendRequests.length}
            </span>
          )}
        </button>
        
        {viewingFriendId && (
          <button 
            onClick={() => setActiveTab('map')}
            style={{
              background: "none",
              border: "none",
              color: activeTab === 'map' ? "#4B9CD3" : "#B8C7D9",
              padding: "10px 20px",
              fontSize: "1rem",
              cursor: "pointer",
              position: "relative",
              borderBottom: activeTab === 'map' ? "2px solid #4B9CD3" : "none",
              marginBottom: "-1px"
            }}
          >
            <FaMapMarkedAlt style={{ marginRight: "8px" }} /> Live Map
          </button>
        )}
      </div>

      {/* Features Tab */}
      {activeTab === 'features' && (
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
      )}

      {/* Friends Tab */}
      {activeTab === 'friends' && (
        <div style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0 20px"
        }}>
          {/* Search and Add Friend */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "15px"
          }}>
            {/* Search */}
            <div style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#102040",
              borderRadius: "5px",
              padding: "8px 15px",
              flex: "1",
              minWidth: "200px"
            }}>
              <FaSearch style={{ color: "#4B9CD3", marginRight: "10px" }} />
              <input 
                type="text" 
                placeholder="Search friends..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  width: "100%",
                  outline: "none"
                }}
              />
            </div>
            
            {/* Add Friend */}
            <div style={{
              display: "flex",
              alignItems: "center",
              flex: "1",
              minWidth: "250px"
            }}>
              <input 
                type="email" 
                placeholder="Friend's email" 
                value={newFriendEmail}
                onChange={(e) => setNewFriendEmail(e.target.value)}
                style={{
                  backgroundColor: "#102040",
                  border: "none",
                  borderRadius: "5px 0 0 5px",
                  padding: "8px 15px",
                  color: "white",
                  flex: "1",
                  outline: "none"
                }}
              />
              <button 
                onClick={sendFriendRequest}
                style={{
                  backgroundColor: "#4B9CD3",
                  border: "none",
                  borderRadius: "0 5px 5px 0",
                  padding: "8px 15px",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <FaUserPlus style={{ marginRight: "5px" }} /> Add
              </button>
            </div>
          </div>
          
          {/* Location Sharing Toggle */}
          <div style={{
            backgroundColor: "#102040",
            borderRadius: "5px",
            padding: "15px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px"
          }}>
            <div>
              <h3 style={{ margin: "0 0 5px 0", color: "white" }}>Location Sharing</h3>
              <p style={{ margin: 0, color: "#B8C7D9", fontSize: "0.9rem" }}>
                {sharingLocation ? "Your location is being shared with friends" : "Start sharing your location with friends"}
              </p>
            </div>
            <button 
              onClick={toggleLocationSharing}
              style={{
                backgroundColor: sharingLocation ? "#FF5252" : "#4CAF50",
                border: "none",
                borderRadius: "5px",
                padding: "8px 15px",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                transition: "all 0.3s ease"
              }}
            >
              {sharingLocation ? (
                <>
                  <FaEye style={{ marginRight: "8px" }} /> Stop Sharing
                </>
              ) : (
                <>
                  <FaEyeSlash style={{ marginRight: "8px" }} /> Start Sharing
                </>
              )}
            </button>
          </div>
          
          {/* Friends List */}
          <div>
            <h3 style={{ color: "white", marginBottom: "15px" }}>My Friends</h3>
            
            {filteredFriends.length > 0 ? (
              filteredFriends.map(friend => (
                <div 
                  key={friend.id}
                  style={{
                    backgroundColor: "#102040",
                    borderRadius: "5px",
                    padding: "15px",
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "15px"
                  }}
                >
                  <img 
                    src={friend.profilePic} 
                    alt={friend.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      border: friend.status === 'online' ? "2px solid #4CAF50" : "2px solid #B8C7D9"
                    }}
                  />
                  
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: "0 0 5px 0", color: "white" }}>{friend.name}</h4>
                    <p style={{ margin: 0, color: "#B8C7D9", fontSize: "0.9rem" }}>{friend.email}</p>
                    <div style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
                      <span 
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: friend.status === 'online' ? "#4CAF50" : "#B8C7D9",
                          marginRight: "5px"
                        }}
                      ></span>
                      <span style={{ color: "#B8C7D9", fontSize: "0.8rem" }}>
                        {friend.status === 'online' ? 'Online' : 'Offline'}
                      </span>
                      
                      {friend.isSharing && (
                        <span style={{ 
                          color: "#4B9CD3", 
                          fontSize: "0.8rem",
                          marginLeft: "10px",
                          display: "flex",
                          alignItems: "center"
                        }}>
                          <FaShareAlt style={{ marginRight: "5px" }} /> Sharing location
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    {friend.isSharing ? (
                      <button 
                        onClick={() => viewFriendLocation(friend.id)}
                        style={{
                          backgroundColor: "#4B9CD3",
                          border: "none",
                          borderRadius: "5px",
                          padding: "8px 15px",
                          color: "white",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        <FaMapMarkedAlt style={{ marginRight: "5px" }} /> View
                      </button>
                    ) : (
                      <div style={{ 
                        color: "#B8C7D9", 
                        fontSize: "0.8rem",
                        padding: "8px 0"
                      }}>
                        Not sharing location
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div style={{
                backgroundColor: "#102040",
                borderRadius: "5px",
                padding: "20px",
                textAlign: "center",
                color: "#B8C7D9"
              }}>
                <p>No friends found matching your search</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Friend Requests Tab */}
      {activeTab === 'requests' && (
        <div style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0 20px"
        }}>
          <h3 style={{ color: "white", marginBottom: "15px" }}>Friend Requests</h3>
          
          {friendRequests.length > 0 ? (
            friendRequests.map(request => (
              <div 
                key={request.id}
                style={{
                  backgroundColor: "#102040",
                  borderRadius: "5px",
                  padding: "15px",
                  marginBottom: "15px",
                  display: "flex",
                  alignItems: "center",
                  gap: "15px"
                }}
              >
                <img 
                  src={request.profilePic} 
                  alt={request.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%"
                  }}
                />
                
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: "0 0 5px 0", color: "white" }}>{request.name}</h4>
                  <p style={{ margin: "0 0 5px 0", color: "#B8C7D9", fontSize: "0.9rem" }}>{request.email}</p>
                  <p style={{ margin: 0, color: "#B8C7D9", fontSize: "0.8rem" }}>
                    Request sent {new Date(request.sentAt).toLocaleString()}
                  </p>
                </div>
                
                <div style={{ display: "flex", gap: "10px" }}>
                  <button 
                    onClick={() => acceptFriendRequest(request.id)}
                    style={{
                      backgroundColor: "#4CAF50",
                      border: "none",
                      borderRadius: "5px",
                      padding: "8px 15px",
                      color: "white",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <FaCheckCircle style={{ marginRight: "5px" }} /> Accept
                  </button>
                  
                  <button 
                    onClick={() => rejectFriendRequest(request.id)}
                    style={{
                      backgroundColor: "#FF5252",
                      border: "none",
                      borderRadius: "5px",
                      padding: "8px 15px",
                      color: "white",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <FaTimesCircle style={{ marginRight: "5px" }} /> Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{
              backgroundColor: "#102040",
              borderRadius: "5px",
              padding: "20px",
              textAlign: "center",
              color: "#B8C7D9"
            }}>
              <p>You have no pending friend requests</p>
            </div>
          )}
        </div>
      )}

      {/* Map Tab */}
      {activeTab === 'map' && viewingFriendId && (
        <div style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0 20px"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px"
          }}>
            <h3 style={{ color: "white", margin: 0 }}>
              Live Location: {friends.find(f => f.id === viewingFriendId)?.name}
            </h3>
            
            <button 
              onClick={() => setActiveTab('friends')}
              style={{
                backgroundColor: "transparent",
                border: "1px solid #4B9CD3",
                borderRadius: "5px",
                padding: "5px 10px",
                color: "#4B9CD3",
                cursor: "pointer",
                fontSize: "0.9rem"
              }}
            >
              Back to Friends
            </button>
          </div>
          
          {/* Map Container */}
          <div style={{
            backgroundColor: "#102040",
            borderRadius: "5px",
            padding: "15px",
            marginBottom: "15px",
            position: "relative",
            height: "400px",
            overflow: "hidden"
          }}>
            {/* Simulated Map Background */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: "linear-gradient(to bottom, #0A1929, #102040)",
              backgroundSize: "cover",
              opacity: 0.8,
              zIndex: 1
            }}>
              {/* Grid lines */}
              <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#1E3A5F" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            {/* Friend's location marker */}
            {friends.find(f => f.id === viewingFriendId)?.location && (
              <div style={{
                position: "absolute",
                left: `${(friends.find(f => f.id === viewingFriendId).location.longitude - 77.1) * 500 + 200}px`,
                top: `${(28.7 - friends.find(f => f.id === viewingFriendId).location.latitude) * 500 + 100}px`,
                zIndex: 3,
                transform: "translate(-50%, -50%)"
              }}>
                <div style={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative"
                }}>
                  {/* Pulse animation */}
                  <div style={{
                    position: "absolute",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(76, 175, 80, 0.3)",
                    animation: "pulse 2s infinite"
                  }}></div>
                  
                  <img 
                    src={friends.find(f => f.id === viewingFriendId).profilePic}
                    alt="Friend location"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      border: "2px solid #4CAF50",
                      zIndex: 2
                    }}
                  />
                </div>
                <div style={{
                  backgroundColor: "rgba(16, 32, 64, 0.8)",
                  color: "white",
                  padding: "3px 8px",
                  borderRadius: "3px",
                  fontSize: "0.8rem",
                  marginTop: "5px",
                  textAlign: "center"
                }}>
                  {friends.find(f => f.id === viewingFriendId).name}
                </div>
              </div>
            )}
            
            {/* Your location marker */}
            {currentLocation && (
              <div style={{
                position: "absolute",
                left: `${(currentLocation.longitude - 77.1) * 500 + 200}px`,
                top: `${(28.7 - currentLocation.latitude) * 500 + 100}px`,
                zIndex: 3,
                transform: "translate(-50%, -50%)"
              }}>
                <div style={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative"
                }}>
                  {/* Pulse animation */}
                  <div style={{
                    position: "absolute",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(75, 156, 211, 0.3)",
                    animation: "pulse 2s infinite"
                  }}></div>
                  
                  <img 
                    src={currentUser.profilePic}
                    alt="Your location"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      border: "2px solid #4B9CD3",
                      zIndex: 2
                    }}
                  />
                </div>
                <div style={{
                  backgroundColor: "rgba(16, 32, 64, 0.8)",
                  color: "white",
                  padding: "3px 8px",
                  borderRadius: "3px",
                  fontSize: "0.8rem",
                  marginTop: "5px",
                  textAlign: "center"
                }}>
                  You
                </div>
              </div>
            )}
            
            {/* Connection line between markers */}
            {currentLocation && friends.find(f => f.id === viewingFriendId)?.location && (
              <svg style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 2
              }}>
                <line 
                  x1={`${(currentLocation.longitude - 77.1) * 500 + 200}`}
                  y1={`${(28.7 - currentLocation.latitude) * 500 + 100}`}
                  x2={`${(friends.find(f => f.id === viewingFriendId).location.longitude - 77.1) * 500 + 200}`}
                  y2={`${(28.7 - friends.find(f => f.id === viewingFriendId).location.latitude) * 500 + 100}`}
                  stroke="#4B9CD3"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              </svg>
            )}
          </div>
          
          {/* Location Details */}
          {friends.find(f => f.id === viewingFriendId)?.location && (
            <div style={{
              backgroundColor: "#102040",
              borderRadius: "5px",
              padding: "15px"
            }}>
              <h4 style={{ color: "white", marginTop: 0 }}>Location Details</h4>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "15px"
              }}>
                <div>
                  <p style={{ color: "#B8C7D9", margin: "0 0 5px 0", fontSize: "0.9rem" }}>
                    <strong>Latitude:</strong> {friends.find(f => f.id === viewingFriendId).location.latitude.toFixed(4)}
                  </p>
                  <p style={{ color: "#B8C7D9", margin: "0 0 5px 0", fontSize: "0.9rem" }}>
                    <strong>Longitude:</strong> {friends.find(f => f.id === viewingFriendId).location.longitude.toFixed(4)}
                  </p>
                </div>
                
                <div>
                  <p style={{ color: "#B8C7D9", margin: "0 0 5px 0", fontSize: "0.9rem" }}>
                    <strong>Last Updated:</strong> {new Date(friends.find(f => f.id === viewingFriendId).location.lastUpdated).toLocaleString()}
                  </p>
                  {currentLocation && (
                    <p style={{ color: "#B8C7D9", margin: "0 0 5px 0", fontSize: "0.9rem" }}>
                      <strong>Distance:</strong> {calculateDistance(currentLocation, friends.find(f => f.id === viewingFriendId).location).toFixed(2)} km
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add CSS for animations */}
      <style>
        {`
          @keyframes orbit {
            0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
          }
          
          @keyframes pulse {
            0% { transform: scale(0.8); opacity: 1; }
            70% { transform: scale(1.5); opacity: 0; }
            100% { transform: scale(0.8); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default SocialConnect;