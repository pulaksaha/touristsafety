const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Store the API key and token
let bhuvanApiKey = 'b2946070ae0db8820e7637642d023451250b6c25';
let bhuvanAuthToken = null;

// Authenticate with Bhuvan API and get token
async function authenticateWithBhuvan() {
  try {
    console.log('Attempting to authenticate with Bhuvan API using key:', bhuvanApiKey);
    
    // For debugging, let's create a mock token since the real API is failing
    // This is a temporary solution until the real API works
    bhuvanAuthToken = 'mock_token_' + Date.now();
    console.log('Created mock authentication token for development');
    return bhuvanAuthToken;
    
    /* Commented out real authentication that's failing
    const response = await axios.post('https://bhuvan-app1.nrsc.gov.in/api/auth', {
      apiKey: bhuvanApiKey
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.status === 200 && response.data && response.data.token) {
      bhuvanAuthToken = response.data.token;
      console.log('Successfully authenticated with Bhuvan API');
      return bhuvanAuthToken;
    } else {
      console.error('Failed to authenticate with Bhuvan API:', response.status, response.data);
      return null;
    }
    */
  } catch (error) {
    console.error('Error authenticating with Bhuvan API:', error.message);
    return null;
  }
}

// Middleware to ensure we have a valid token
async function ensureAuthenticated(req, res, next) {
  if (!bhuvanAuthToken) {
    bhuvanAuthToken = await authenticateWithBhuvan();
    if (!bhuvanAuthToken) {
      return res.status(500).json({ error: 'Failed to authenticate with Bhuvan API' });
    }
  }
  next();
}

// Route to get authentication token
app.post('/api/auth', async (req, res) => {
  try {
    // Update API key if provided
    if (req.body && req.body.apiKey) {
      bhuvanApiKey = req.body.apiKey;
    }
    
    const token = await authenticateWithBhuvan();
    if (token) {
      res.json({ token });
    } else {
      res.status(500).json({ error: 'Authentication failed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for routing
app.post('/api/routing', ensureAuthenticated, async (req, res) => {
  try {
    console.log('Routing request received:', req.body);
    
    // Generate mock route data for development
    const { start, end } = req.body;
    const mockRouteData = {
      route: {
        distance: 5.2, // km
        duration: 15, // minutes
        points: [
          { latitude: start.latitude, longitude: start.longitude },
          { latitude: (start.latitude + end.latitude) / 2, longitude: (start.longitude + end.longitude) / 2 },
          { latitude: end.latitude, longitude: end.longitude }
        ]
      }
    };
    
    console.log('Returning mock route data');
    res.json(mockRouteData);
    
    /* Commented out real API call that's failing
    const response = await axios.post('https://bhuvan-app1.nrsc.gov.in/api/routing', req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bhuvanAuthToken}`
      }
    });
    res.json(response.data);
    */
  } catch (error) {
    console.error('Routing API error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Route for geofence creation
app.post('/api/geofence', ensureAuthenticated, async (req, res) => {
  try {
    console.log('Geofence creation request received:', req.body);
    
    // Generate mock geofence data for development
    const mockGeofenceData = {
      id: 'geofence_' + Date.now(),
      name: req.body.name || 'Default Geofence',
      status: 'active'
    };
    
    console.log('Returning mock geofence data');
    res.json(mockGeofenceData);
    
    /* Commented out real API call that's failing
    const response = await axios.post('https://bhuvan-app1.nrsc.gov.in/api/geofence', req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bhuvanAuthToken}`
      }
    });
    res.json(response.data);
    */
  } catch (error) {
    console.error('Geofence API error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Route for geofence checking
app.post('/api/geofence/check', ensureAuthenticated, async (req, res) => {
  try {
    console.log('Geofence check request received:', req.body);
    
    // Generate mock geofence check data for development
    const mockGeofenceCheckData = {
      inside: Math.random() > 0.5, // Randomly return true or false
      distance: Math.random() * 100, // Random distance in meters
      geofenceId: req.body.geofenceId || 'default_geofence'
    };
    
    console.log('Returning mock geofence check data:', mockGeofenceCheckData);
    res.json(mockGeofenceCheckData);
    
    /* Commented out real API call that's failing
    const response = await axios.post('https://bhuvan-app1.nrsc.gov.in/api/geofence/check', req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bhuvanAuthToken}`
      }
    });
    res.json(response.data);
    */
  } catch (error) {
    console.error('Geofence check API error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Route for landmarks
app.post('/api/landmarks', ensureAuthenticated, async (req, res) => {
  try {
    console.log('Landmarks request received:', req.body);
    
    // Generate mock landmarks data for development
    const { latitude, longitude, radius } = req.body;
    const mockLandmarks = [
      {
        id: 'landmark_1',
        name: 'Hospital',
        type: 'healthcare',
        latitude: latitude + (Math.random() * 0.01),
        longitude: longitude + (Math.random() * 0.01),
        distance: Math.random() * radius
      },
      {
        id: 'landmark_2',
        name: 'Police Station',
        type: 'emergency',
        latitude: latitude - (Math.random() * 0.01),
        longitude: longitude - (Math.random() * 0.01),
        distance: Math.random() * radius
      },
      {
        id: 'landmark_3',
        name: 'Fuel Station',
        type: 'service',
        latitude: latitude + (Math.random() * 0.01),
        longitude: longitude - (Math.random() * 0.01),
        distance: Math.random() * radius
      }
    ];
    
    console.log('Returning mock landmarks data');
    res.json({ landmarks: mockLandmarks });
    
    /* Commented out real API call that's failing
    const response = await axios.post('https://bhuvan-app1.nrsc.gov.in/api/landmarks', req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bhuvanAuthToken}`
      }
    });
    res.json(response.data);
    */
  } catch (error) {
    console.error('Landmarks API error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Bhuvan API proxy server running on port ${port}`);
});