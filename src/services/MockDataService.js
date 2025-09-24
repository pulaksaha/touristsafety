// MockDataService.js - Mock data service for GitHub Pages deployment

class MockDataService {
  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production';
    this.baseUrl = this.isProduction ? '' : 'http://localhost:5000/api';
  }

  // Check if we're running on GitHub Pages (no backend available)
  isGitHubPages() {
    return window.location.hostname === 'pulaksaha.github.io' || 
           window.location.hostname.includes('github.io') ||
           this.isProduction;
  }

  // Mock authentication
  async authenticate() {
    if (this.isGitHubPages()) {
      console.log('Using mock authentication for GitHub Pages');
      return { 
        success: true, 
        token: 'mock_token_' + Date.now() 
      };
    }
    
    // Try real API call
    try {
      const response = await fetch(`${this.baseUrl}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: 'b2946070ae0db8820e7637642d023451250b6c25' })
      });
      
      if (response.ok) {
        const data = await response.json();
        return { success: true, token: data.token };
      }
    } catch (error) {
      console.warn('Backend not available, using mock data');
    }
    
    // Fallback to mock
    return { 
      success: true, 
      token: 'mock_token_' + Date.now() 
    };
  }

  // Mock route generation
  async getRoute(startLat, startLng, endLat, endLng) {
    if (this.isGitHubPages()) {
      console.log('Using mock route data for GitHub Pages');
      return this.generateMockRoute(startLat, startLng, endLat, endLng);
    }
    
    // Try real API call
    try {
      const authResult = await this.authenticate();
      const response = await fetch(`${this.baseUrl}/routing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authResult.token}`
        },
        body: JSON.stringify({
          start: { latitude: startLat, longitude: startLng },
          end: { latitude: endLat, longitude: endLng }
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.route || this.generateMockRoute(startLat, startLng, endLat, endLng);
      }
    } catch (error) {
      console.warn('Backend not available, using mock route');
    }
    
    return this.generateMockRoute(startLat, startLng, endLat, endLng);
  }

  // Generate realistic mock route
  generateMockRoute(startLat, startLng, endLat, endLng) {
    const points = [];
    const steps = 15;
    
    for (let i = 0; i <= steps; i++) {
      const fraction = i / steps;
      const lat = startLat + (endLat - startLat) * fraction;
      const lng = startLng + (endLng - startLng) * fraction;
      
      // Add some realistic variation to make it look like a real route
      const variation = 0.001 * Math.sin(fraction * Math.PI);
      points.push({
        latitude: lat + variation,
        longitude: lng + variation * 0.5
      });
    }
    
    return {
      distance: this.calculateDistance(startLat, startLng, endLat, endLng),
      duration: Math.round(this.calculateDistance(startLat, startLng, endLat, endLng) * 2), // ~2 min per km
      points: points
    };
  }

  // Calculate distance between two points
  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  // Mock geofence creation
  async createGeofence(name, coordinates, radius) {
    if (this.isGitHubPages()) {
      console.log('Using mock geofence creation for GitHub Pages');
      return {
        success: true,
        id: 'geofence_' + Date.now(),
        name: name,
        status: 'active'
      };
    }
    
    // Try real API call
    try {
      const authResult = await this.authenticate();
      const response = await fetch(`${this.baseUrl}/geofence`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authResult.token}`
        },
        body: JSON.stringify({ name, center: coordinates, radius })
      });
      
      if (response.ok) {
        const data = await response.json();
        return { ...data, success: true };
      }
    } catch (error) {
      console.warn('Backend not available, using mock geofence');
    }
    
    return {
      success: true,
      id: 'geofence_' + Date.now(),
      name: name,
      status: 'active'
    };
  }

  // Mock geofence check
  async checkGeofence(geofenceId, latitude, longitude) {
    if (this.isGitHubPages()) {
      console.log('Using mock geofence check for GitHub Pages');
      // Randomly return true/false for demo purposes
      return Math.random() > 0.5;
    }
    
    // Try real API call
    try {
      const authResult = await this.authenticate();
      const response = await fetch(`${this.baseUrl}/geofence/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authResult.token}`
        },
        body: JSON.stringify({
          geofenceId,
          point: { latitude, longitude }
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.inside || false;
      }
    } catch (error) {
      console.warn('Backend not available, using mock geofence check');
    }
    
    return Math.random() > 0.5;
  }

  // Mock landmarks
  async getNearbyLandmarks(latitude, longitude, radius = 1000) {
    if (this.isGitHubPages()) {
      console.log('Using mock landmarks for GitHub Pages');
      return this.generateMockLandmarks(latitude, longitude, radius);
    }
    
    // Try real API call
    try {
      const authResult = await this.authenticate();
      const response = await fetch(`${this.baseUrl}/landmarks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authResult.token}`
        },
        body: JSON.stringify({
          center: { latitude, longitude },
          radius
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.landmarks || this.generateMockLandmarks(latitude, longitude, radius);
      }
    } catch (error) {
      console.warn('Backend not available, using mock landmarks');
    }
    
    return this.generateMockLandmarks(latitude, longitude, radius);
  }

  // Generate realistic mock landmarks
  generateMockLandmarks(latitude, longitude, radius) {
    const landmarkTypes = [
      { name: 'Hospital', type: 'healthcare', icon: '🏥' },
      { name: 'Police Station', type: 'emergency', icon: '🚔' },
      { name: 'Fuel Station', type: 'service', icon: '⛽' },
      { name: 'Restaurant', type: 'food', icon: '🍽️' },
      { name: 'ATM', type: 'service', icon: '🏧' },
      { name: 'Pharmacy', type: 'healthcare', icon: '💊' },
      { name: 'Bank', type: 'service', icon: '🏦' },
      { name: 'School', type: 'education', icon: '🏫' }
    ];
    
    const landmarks = [];
    const numLandmarks = Math.floor(Math.random() * 5) + 3; // 3-7 landmarks
    
    for (let i = 0; i < numLandmarks; i++) {
      const type = landmarkTypes[Math.floor(Math.random() * landmarkTypes.length)];
      const angle = (Math.PI * 2 * i) / numLandmarks + Math.random() * 0.5;
      const distance = Math.random() * (radius / 1000); // Convert to km
      
      const lat = latitude + (distance * Math.cos(angle) * 0.01);
      const lng = longitude + (distance * Math.sin(angle) * 0.01);
      
      landmarks.push({
        id: `landmark_${i + 1}`,
        name: `${type.name} ${i + 1}`,
        type: type.type,
        icon: type.icon,
        latitude: lat,
        longitude: lng,
        distance: distance * 1000 // Convert back to meters
      });
    }
    
    return landmarks;
  }
}

export default MockDataService;
