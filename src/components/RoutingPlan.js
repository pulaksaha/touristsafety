import React, { useState, useEffect, useRef } from 'react';
import BhuvanAPI from '../services/BhuvanAPI';
import PathSimulator from '../services/PathSimulator';
import GeofencingService from '../services/GeofencingService';
import { FaMapMarkedAlt, FaRoute } from 'react-icons/fa';

const RoutingPlan = () => {
  const [mode, setMode] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [route, setRoute] = useState([]);
  const [checkpoints, setCheckpoints] = useState([]);
  const [simulationActive, setSimulationActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sosTriggered, setSosTriggered] = useState(false);
  const [geofences, setGeofences] = useState([]);
  const [isInGeofence, setIsInGeofence] = useState(false);
  
  const bhuvanApiRef = useRef(new BhuvanAPI("b2946070ae0db8820e7637642d023451250b6c25"));
  
  // Force authentication on component mount
  useEffect(() => {
    const initBhuvanAPI = async () => {
      try {
        await bhuvanApiRef.current.authenticate();
        console.log('Bhuvan API authenticated successfully');
      } catch (error) {
        console.error('Failed to authenticate with Bhuvan API:', error);
        // Continue with fallback methods if authentication fails
      }
    };
    
    initBhuvanAPI();
  }, []);
  const pathSimulatorRef = useRef(null);
  const geofencingServiceRef = useRef(new GeofencingService(bhuvanApiRef.current));
  
  useEffect(() => {
    // Get current location when component mounts
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        console.error('Error getting location:', error);
        // Default location (New Delhi)
        setCurrentLocation({
          latitude: 28.6139,
          longitude: 77.2090
        });
      }
    );
  }, []);

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
    setShowDetails(true);
    setShowMap(false);
    setRoute([]);
    setCheckpoints([]);
    setSimulationActive(false);
    setElapsedTime(0);
    setSosTriggered(false);
  };
  
  // Update location during simulation
  const updateLocation = (newLocation) => {
    setCurrentLocation(newLocation);
    
    // Check if in geofence
    checkGeofenceStatus(newLocation.latitude, newLocation.longitude);
  };
  
  // Check if current location is in any geofence
  const checkGeofenceStatus = async (latitude, longitude) => {
    const inGeofence = await geofencingServiceRef.current.isPointInActiveGeofence(latitude, longitude);
    setIsInGeofence(inGeofence);
  };
  
  // Handle SOS trigger
  const handleSOS = (checkpointNumber) => {
    setSosTriggered(true);
    alert(`SOS Alert: Missed checkpoint ${checkpointNumber}! Emergency contacts would be notified in a real scenario.`);
  };
  
  // Handle simulation end
  const handleSimulationEnd = (message) => {
    setSimulationActive(false);
    alert(message);
  };
  
  // Update timer
  const updateTimer = (seconds) => {
    setElapsedTime(seconds);
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#0A1929',
      color: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
      border: '1px solid #1E3A5F',
      maxWidth: '1000px',
      margin: '0 auto'
    }}>
      <h2 style={{ 
        fontSize: '2rem', 
        color: 'white',
        marginBottom: '20px',
        textAlign: 'center',
        textShadow: '0 2px 10px rgba(75, 156, 211, 0.5)'
      }}>Route Planning & Geo-fencing</h2>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '30px',
        gap: '20px'
      }}>
        <button
          style={{
            padding: '12px 25px',
            background: mode === 'Automatic' ? 'linear-gradient(135deg, #4B9CD3 0%, #1976D2 100%)' : 'linear-gradient(135deg, #102040 0%, #0A1929 100%)',
            color: 'white',
            border: '1px solid #1E3A5F',
            borderRadius: '5px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: mode === 'Automatic' ? '0 2px 10px rgba(75, 156, 211, 0.5)' : 'none'
          }}
          onClick={() => handleModeChange('Automatic')}
        >
          Automatic Mode
        </button>
        <button
          style={{
            padding: '12px 25px',
            background: mode === 'Manual' ? 'linear-gradient(135deg, #4B9CD3 0%, #1976D2 100%)' : 'linear-gradient(135deg, #102040 0%, #0A1929 100%)',
            color: 'white',
            border: '1px solid #1E3A5F',
            borderRadius: '5px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: mode === 'Manual' ? '0 2px 10px rgba(75, 156, 211, 0.5)' : 'none'
          }}
          onClick={() => handleModeChange('Manual')}
        >
          Manual Mode
        </button>
      </div>

      {showDetails && (
        <div style={{
          backgroundColor: '#102040',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #1E3A5F'
        }}>
          <h3 style={{ color: '#4B9CD3', marginBottom: '15px' }}>{mode} Mode</h3>
          <p style={{ color: '#B8C7D9', lineHeight: '1.6' }}>
            {mode === 'Automatic' ? 
              'In Automatic mode, predefined checkpoints are automatically set for your route based on your destination. The system will monitor your progress and send alerts if you deviate from the planned route.' :
              'In Manual mode, you can set your own checkpoints along your journey. This gives you flexibility to customize your route while still maintaining safety monitoring.'}
          </p>
          
          <div style={{ marginTop: '20px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '15px',
              backgroundColor: '#0A1929',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid #1E3A5F'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: '#1E3A5F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '15px'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#4B9CD3"/>
                </svg>
              </div>
              <div>
                <h4 style={{ color: 'white', marginBottom: '5px' }}>Route Tracking</h4>
                <p style={{ color: '#B8C7D9', margin: 0 }}>Real-time GPS tracking with satellite connectivity ensures your location is always monitored.</p>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '15px',
              backgroundColor: '#0A1929',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid #1E3A5F'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: '#1E3A5F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '15px'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" fill="#4B9CD3"/>
                </svg>
              </div>
              <div>
                <h4 style={{ color: 'white', marginBottom: '5px' }}>Geo-fencing</h4>
                <p style={{ color: '#B8C7D9', margin: 0 }}>Set virtual boundaries to receive alerts when you enter or exit designated safe zones.</p>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#0A1929',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid #1E3A5F'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: '#1E3A5F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '15px'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#FF5252"/>
                </svg>
              </div>
              <div>
                <h4 style={{ color: 'white', marginBottom: '5px' }}>SOS Alerts</h4>
                <p style={{ color: '#B8C7D9', margin: 0 }}>Automatic SOS alerts are sent if you miss checkpoints or deviate significantly from your route.</p>
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: '25px', textAlign: 'center' }}>
            <button
            style={{
              padding: '12px 25px',
              background: 'linear-gradient(135deg, #4B9CD3 0%, #1976D2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 10px rgba(75, 156, 211, 0.5)'
            }}
            onClick={() => setShowMap(true)}
          >
            Start Navigation
          </button>
          </div>
        </div>
      )}
      
      {showMap ? (
        <div style={{
          backgroundColor: '#102040',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #1E3A5F',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#4B9CD3', marginBottom: '15px' }}>{mode} Navigation</h3>
          
          {/* Map Container */}
          <div style={{
            width: '100%',
            height: '400px',
            backgroundColor: '#0A1929',
            border: '1px solid #1E3A5F',
            borderRadius: '8px',
            marginBottom: '20px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Simulated Map - In a real implementation, this would be a proper map component */}
            <div style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              backgroundColor: '#0A1929',
              backgroundImage: 'url("https://bhuvan-app1.nrsc.gov.in/bhuvan2d/bhuvan/bhuvan2d.html?l=73.85,15.50,5z")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              {/* Current Location Marker */}
              {currentLocation && (
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#4B9CD3',
                  border: '3px solid white',
                  boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                  zIndex: 10
                }} />
              )}
              
              {/* Route Line */}
              {route.length > 0 && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 5
                }}>
                  <svg width="100%" height="100%" style={{ position: 'absolute' }}>
                    <path 
                      d="M 100,100 L 200,200 L 300,150 L 400,300" 
                      stroke="#4B9CD3" 
                      strokeWidth="3" 
                      fill="none" 
                      strokeDasharray="5,5"
                    />
                  </svg>
                </div>
              )}
              
              {/* Checkpoints */}
              {checkpoints.map((checkpoint, index) => (
                <div 
                  key={index}
                  style={{
                    position: 'absolute',
                    left: `${100 + index * 100}px`,
                    top: `${100 + (index % 2) * 100}px`,
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    backgroundColor: '#FF5252',
                    border: '2px solid white',
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                    zIndex: 8
                  }}
                />
              ))}
              
              {/* Geofence Circles */}
              {geofences.map((geofence, index) => (
                <div 
                  key={index}
                  style={{
                    position: 'absolute',
                    left: `${100 + index * 100}px`,
                    top: `${100 + (index % 2) * 100}px`,
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: '2px dashed #4B9CD3',
                    opacity: 0.6,
                    zIndex: 7,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}
              
              {/* Map Controls */}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px'
              }}>
                <button 
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#1E3A5F',
                    border: 'none',
                    color: 'white',
                    fontSize: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    if (pathSimulatorRef.current) {
                      pathSimulatorRef.current.speedUp();
                    }
                  }}
                >
                  +
                </button>
                <button 
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#1E3A5F',
                    border: 'none',
                    color: 'white',
                    fontSize: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    if (pathSimulatorRef.current) {
                      pathSimulatorRef.current.slowDown();
                    }
                  }}
                >
                  -
                </button>
              </div>
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px'
          }}>
            <div style={{ flex: 1, marginRight: '10px' }}>
              <label style={{ color: 'white', display: 'block', marginBottom: '5px' }}>Start Location</label>
              <input 
                type="text" 
                value={currentLocation ? `${currentLocation.latitude.toFixed(6)}, ${currentLocation.longitude.toFixed(6)}` : ''}
                readOnly
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#0A1929',
                  border: '1px solid #1E3A5F',
                  borderRadius: '5px',
                  color: 'white'
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ color: 'white', display: 'block', marginBottom: '5px' }}>Destination</label>
              <input 
                type="text" 
                placeholder="Enter destination"
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#0A1929',
                  border: '1px solid #1E3A5F',
                  borderRadius: '5px',
                  color: 'white'
                }}
                onChange={(e) => {
                  // In a real implementation, this would use geocoding
                  // For now, we'll use a dummy destination
                  setDestination({
                    latitude: currentLocation ? currentLocation.latitude + 0.01 : 28.6139,
                    longitude: currentLocation ? currentLocation.longitude + 0.01 : 77.2090
                  });
                }}
              />
            </div>
          </div>
          
          {/* Checkpoint Controls - Only show in Manual mode */}
          {mode === 'Manual' && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: 'white', display: 'block', marginBottom: '5px' }}>Add Checkpoint</label>
              <div style={{ display: 'flex' }}>
                <input 
                  type="text" 
                  placeholder="Checkpoint location"
                  style={{
                    flex: 1,
                    padding: '8px',
                    backgroundColor: '#0A1929',
                    border: '1px solid #1E3A5F',
                    borderRadius: '5px 0 0 5px',
                    color: 'white'
                  }}
                />
                <button
                  style={{
                    padding: '8px 15px',
                    backgroundColor: '#1E3A5F',
                    border: '1px solid #1E3A5F',
                    borderLeft: 'none',
                    borderRadius: '0 5px 5px 0',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    // Add a checkpoint at a random location along the route
                    if (currentLocation && destination) {
                      const newCheckpoint = {
                        latitude: currentLocation.latitude + (Math.random() * 0.01),
                        longitude: currentLocation.longitude + (Math.random() * 0.01),
                        expectedTime: "5" // 5 minutes to reach
                      };
                      setCheckpoints([...checkpoints, newCheckpoint]);
                    }
                  }}
                >
                  Add
                </button>
              </div>
              
              {/* Checkpoint List */}
              {checkpoints.length > 0 && (
                <div style={{ marginTop: '10px' }}>
                  <h4 style={{ color: 'white', marginBottom: '5px' }}>Checkpoints:</h4>
                  <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                    {checkpoints.map((checkpoint, index) => (
                      <div 
                        key={index}
                        style={{
                          padding: '5px',
                          backgroundColor: '#0A1929',
                          border: '1px solid #1E3A5F',
                          borderRadius: '5px',
                          marginBottom: '5px',
                          color: 'white',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <span>Checkpoint {index + 1}</span>
                        <span>{checkpoint.expectedTime} min</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Timer Display */}
          {simulationActive && (
            <div style={{
              backgroundColor: '#0A1929',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '20px',
              color: 'white',
              textAlign: 'center'
            }}>
              <div>Time to next checkpoint: {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}</div>
              {isInGeofence && <div style={{ color: '#4CAF50', marginTop: '5px' }}>Inside safe zone</div>}
              {sosTriggered && <div style={{ color: '#FF5252', marginTop: '5px', fontWeight: 'bold' }}>SOS TRIGGERED</div>}
            </div>
          )}
          
          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            {!simulationActive ? (
              <button
                style={{
                  padding: '12px 25px',
                  background: 'linear-gradient(135deg, #4B9CD3 0%, #1976D2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 10px rgba(75, 156, 211, 0.5)'
                }}
                onClick={() => {
                  // Start the simulation
                  if (currentLocation && destination) {
                    // Generate a route
                    const generatedRoute = [];
                    const steps = 20;
                    for (let i = 0; i <= steps; i++) {
                      const fraction = i / steps;
                      generatedRoute.push({
                        latitude: currentLocation.latitude + (destination.latitude - currentLocation.latitude) * fraction,
                        longitude: currentLocation.longitude + (destination.longitude - currentLocation.longitude) * fraction
                      });
                    }
                    setRoute(generatedRoute);
                    
                    // Generate checkpoints if in automatic mode
                    if (mode === 'Automatic' && checkpoints.length === 0) {
                      const autoCheckpoints = [];
                      for (let i = 1; i < 4; i++) {
                        const fraction = i / 4;
                        autoCheckpoints.push({
                          latitude: currentLocation.latitude + (destination.latitude - currentLocation.latitude) * fraction,
                          longitude: currentLocation.longitude + (destination.longitude - currentLocation.longitude) * fraction,
                          expectedTime: "5" // 5 minutes to reach
                        });
                      }
                      setCheckpoints(autoCheckpoints);
                    }
                    
                    // Create geofences
                    const createGeofences = async () => {
                      const newGeofences = [];
                      for (const checkpoint of checkpoints) {
                        const geofence = await geofencingServiceRef.current.createGeofence(
                          `Checkpoint Geofence`,
                          checkpoint.latitude,
                          checkpoint.longitude,
                          100 // 100 meters radius
                        );
                        newGeofences.push(geofence);
                      }
                      setGeofences(newGeofences);
                      
                      // Set the first geofence as active
                      if (newGeofences.length > 0) {
                        geofencingServiceRef.current.setActiveGeofence(newGeofences[0].id);
                      }
                    };
                    createGeofences();
                    
                    // Initialize and start the path simulator
                    pathSimulatorRef.current = new PathSimulator(
                      generatedRoute,
                      updateLocation,
                      checkpoints,
                      handleSOS,
                      handleSimulationEnd,
                      updateTimer
                    );
                    pathSimulatorRef.current.startSimulation();
                    setSimulationActive(true);
                  } else {
                    alert('Please set a destination first.');
                  }
                }}
              >
                Start Simulation
              </button>
            ) : (
              <>
                <button
                  style={{
                    padding: '12px 25px',
                    background: 'linear-gradient(135deg, #FF5252 0%, #D32F2F 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 10px rgba(211, 47, 47, 0.5)'
                  }}
                  onClick={() => {
                    // Stop the simulation
                    if (pathSimulatorRef.current) {
                      pathSimulatorRef.current.stopSimulation();
                      setSimulationActive(false);
                    }
                  }}
                >
                  Stop Simulation
                </button>
                <button
                  style={{
                    padding: '12px 25px',
                    background: 'linear-gradient(135deg, #FFC107 0%, #FFA000 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 10px rgba(255, 160, 0, 0.5)'
                  }}
                  onClick={() => {
                    // Trigger SOS manually
                    handleSOS(0);
                  }}
                >
                  Trigger SOS
                </button>
              </>
            )}
            <button
              style={{
                padding: '12px 25px',
                background: 'linear-gradient(135deg, #102040 0%, #0A1929 100%)',
                color: 'white',
                border: '1px solid #1E3A5F',
                borderRadius: '5px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => {
                // Go back to mode selection
                if (pathSimulatorRef.current) {
                  pathSimulatorRef.current.stopSimulation();
                }
                setShowMap(false);
                setSimulationActive(false);
              }}
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        <div style={{
          backgroundColor: '#102040',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #1E3A5F'
        }}>
          <h3 style={{ color: '#4B9CD3', marginBottom: '15px' }}>How It Works</h3>
          <ol style={{ color: '#B8C7D9', lineHeight: '1.6', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '10px' }}>Select your navigation mode (Automatic or Manual)</li>
            <li style={{ marginBottom: '10px' }}>Set your destination and checkpoints</li>
            <li style={{ marginBottom: '10px' }}>The system monitors your progress in real-time</li>
            <li style={{ marginBottom: '10px' }}>Receive alerts if you deviate from your route</li>
            <li>Emergency contacts are notified automatically if you miss checkpoints</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default RoutingPlan;