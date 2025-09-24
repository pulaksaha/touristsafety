// BhuvanAPI.js - Service for Bhuvan API integration
import MockDataService from './MockDataService';

class BhuvanAPI {
  constructor(apiKey = "b2946070ae0db8820e7637642d023451250b6c25") {
    // Update to use the new access token
    this.apiKey = "b2946070ae0db8820e7637642d023451250b6c25";
    // Use local proxy server instead of direct API calls to avoid CORS issues
    this.baseUrl = "http://localhost:5000/api";
    this.authToken = null;
    this.mockService = new MockDataService();
    console.log('BhuvanAPI initialized with API key:', this.apiKey);
  }

  // Authenticate with Bhuvan API
  async authenticate() {
    // Use mock service if on GitHub Pages or if backend is not available
    if (this.mockService.isGitHubPages()) {
      return await this.mockService.authenticate();
    }
    
    try {
      console.log('Authenticating with Bhuvan API via proxy server...');
      console.log('Using API key:', this.apiKey);
      
      // Add a timeout to the fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(`${this.baseUrl}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: this.apiKey
        }),
        signal: controller.signal
      }).catch(error => {
        console.error('Fetch error during authentication:', error);
        return { ok: false, status: 'network_error', statusText: error.message };
      });
      
      clearTimeout(timeoutId);

      // Handle non-ok responses or network errors
      if (!response.ok) {
        console.warn('Backend not available, using mock authentication');
        return await this.mockService.authenticate();
      }

      // Parse the response
      let data;
      try {
        data = await response.json();
      } catch (e) {
        console.error('Failed to parse authentication response:', e);
        return await this.mockService.authenticate();
      }
      
      // Check if we got a token
      if (!data.token) {
        console.warn('No token received, using mock authentication');
        return await this.mockService.authenticate();
      }
      
      this.authToken = data.token;
      console.log('Successfully authenticated with Bhuvan API');
      return { success: true, token: data.token };
    } catch (error) {
      console.warn('Bhuvan API authentication error, using mock:', error);
      return await this.mockService.authenticate();
    }
  }

  // Get route between two points
  async getRoute(startLat, startLng, endLat, endLng) {
    // Use mock service if on GitHub Pages
    if (this.mockService.isGitHubPages()) {
      return await this.mockService.getRoute(startLat, startLng, endLat, endLng);
    }
    
    try {
      // Make sure we have a valid auth token
      if (!this.authToken) {
        const authResult = await this.authenticate();
        if (authResult.success === false) {
          console.warn('Authentication failed, using mock route');
          return await this.mockService.getRoute(startLat, startLng, endLat, endLng);
        }
      }

      console.log('Requesting route via proxy server...');
      const response = await fetch(`${this.baseUrl}/routing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authToken}`
        },
        body: JSON.stringify({
          start: {
            latitude: startLat,
            longitude: startLng
          },
          end: {
            latitude: endLat,
            longitude: endLng
          }
        })
      });

      if (!response.ok) {
        console.warn('Backend not available, using mock route');
        return await this.mockService.getRoute(startLat, startLng, endLat, endLng);
      }

      const data = await response.json();
      if (!data.route) {
        console.warn('No route data received, using mock route');
        return await this.mockService.getRoute(startLat, startLng, endLat, endLng);
      }
      
      console.log('Successfully retrieved route from Bhuvan API');
      return data.route;
    } catch (error) {
      console.warn('Bhuvan API routing error, using mock route:', error);
      return await this.mockService.getRoute(startLat, startLng, endLat, endLng);
    }
  }

  // Create a geofence
  async createGeofence(name, coordinates, radius) {
    // Use mock service if on GitHub Pages
    if (this.mockService.isGitHubPages()) {
      return await this.mockService.createGeofence(name, coordinates, radius);
    }
    
    try {
      // Make sure we have a valid auth token
      if (!this.authToken) {
        const authResult = await this.authenticate();
        if (authResult.success === false) {
          console.warn('Authentication failed, using mock geofence');
          return await this.mockService.createGeofence(name, coordinates, radius);
        }
      }

      console.log('Creating geofence via proxy server...');
      const response = await fetch(`${this.baseUrl}/geofence`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authToken}`
        },
        body: JSON.stringify({
          name,
          center: coordinates,
          radius // in meters
        })
      });

      if (!response.ok) {
        console.warn('Backend not available, using mock geofence');
        return await this.mockService.createGeofence(name, coordinates, radius);
      }

      const data = await response.json();
      console.log('Successfully created geofence with Bhuvan API');
      return { ...data, success: true };
    } catch (error) {
      console.warn('Bhuvan API geofence error, using mock:', error);
      return await this.mockService.createGeofence(name, coordinates, radius);
    }
  }

  // Check if a point is inside a geofence
  async checkGeofence(geofenceId, latitude, longitude) {
    // Use mock service if on GitHub Pages
    if (this.mockService.isGitHubPages()) {
      return await this.mockService.checkGeofence(geofenceId, latitude, longitude);
    }
    
    try {
      // Make sure we have a valid auth token
      if (!this.authToken) {
        const authResult = await this.authenticate();
        if (authResult.success === false) {
          console.warn('Authentication failed, using mock geofence check');
          return await this.mockService.checkGeofence(geofenceId, latitude, longitude);
        }
      }

      console.log('Checking geofence via proxy server...');
      const response = await fetch(`${this.baseUrl}/geofence/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authToken}`
        },
        body: JSON.stringify({
          geofenceId,
          point: {
            latitude,
            longitude
          }
        })
      });

      if (!response.ok) {
        console.warn('Backend not available, using mock geofence check');
        return await this.mockService.checkGeofence(geofenceId, latitude, longitude);
      }

      const data = await response.json();
      console.log(`Geofence check result: ${data.isInside ? 'inside' : 'outside'}`);
      return data.isInside;
    } catch (error) {
      console.warn('Bhuvan API geofence check error, using mock:', error);
      return await this.mockService.checkGeofence(geofenceId, latitude, longitude);
    }
  }

  // Generate fallback route if API fails
  generateFallbackRoute(startLat, startLng, endLat, endLng) {
    // Create a simple direct route with 10 points
    const route = [];
    for (let i = 0; i <= 10; i++) {
      const fraction = i / 10;
      route.push({
        latitude: startLat + (endLat - startLat) * fraction,
        longitude: startLng + (endLng - startLng) * fraction
      });
    }
    return route;
  }

  // Get nearby landmarks
  async getNearbyLandmarks(latitude, longitude, radius = 1000) {
    // Use mock service if on GitHub Pages
    if (this.mockService.isGitHubPages()) {
      return await this.mockService.getNearbyLandmarks(latitude, longitude, radius);
    }
    
    try {
      // Make sure we have a valid auth token
      if (!this.authToken) {
        const authResult = await this.authenticate();
        if (authResult.success === false) {
          console.warn('Authentication failed, using mock landmarks');
          return await this.mockService.getNearbyLandmarks(latitude, longitude, radius);
        }
      }

      console.log('Fetching landmarks via proxy server...');
      const response = await fetch(`${this.baseUrl}/landmarks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authToken}`
        },
        body: JSON.stringify({
          center: {
            latitude,
            longitude
          },
          radius // in meters
        })
      });

      if (!response.ok) {
        console.warn('Backend not available, using mock landmarks');
        return await this.mockService.getNearbyLandmarks(latitude, longitude, radius);
      }

      const data = await response.json();
      console.log(`Found ${data.landmarks ? data.landmarks.length : 0} landmarks`);
      return data.landmarks || [];
    } catch (error) {
      console.warn('Bhuvan API landmarks error, using mock:', error);
      return await this.mockService.getNearbyLandmarks(latitude, longitude, radius);
    }
  }
}

export default BhuvanAPI;