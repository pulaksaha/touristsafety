// BhuvanAPI.js - Service for Bhuvan API integration

class BhuvanAPI {
  constructor(apiKey = "b2946070ae0db8820e7637642d023451250b6c25") {
    this.apiKey = apiKey;
    // Use local proxy server instead of direct API calls to avoid CORS issues
    this.baseUrl = "http://localhost:5000/api";
    this.authToken = null;
    console.log('BhuvanAPI initialized with API key:', this.apiKey);
  }

  // Authenticate with Bhuvan API
  async authenticate() {
    try {
      console.log('Authenticating with Bhuvan API via proxy server...');
      console.log('Using API key:', this.apiKey);
      
      // Add a timeout to the fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
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
        let errorMessage = 'Authentication failed';
        try {
          const errorText = await response.text();
          errorMessage = `Authentication failed: ${response.status} - ${errorText || response.statusText}`;
        } catch (e) {
          errorMessage = `Authentication failed: ${response.status || 'Network error'}`;
        }
        console.error(errorMessage);
        return { success: false, error: errorMessage };
      }

      // Parse the response
      let data;
      try {
        data = await response.json();
      } catch (e) {
        console.error('Failed to parse authentication response:', e);
        return { success: false, error: 'Invalid response format' };
      }
      
      // Check if we got a token
      if (!data.token) {
        console.error('No token received from authentication response', data);
        return { success: false, error: 'No authentication token received' };
      }
      
      this.authToken = data.token;
      console.log('Successfully authenticated with Bhuvan API');
      return { success: true, token: data.token };
    } catch (error) {
      console.error('Bhuvan API authentication error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get route between two points
  async getRoute(startLat, startLng, endLat, endLng) {
    try {
      // Make sure we have a valid auth token
      if (!this.authToken) {
        const authResult = await this.authenticate();
        if (authResult.success === false) {
          console.warn('Authentication failed, using fallback route');
          return this.generateFallbackRoute(startLat, startLng, endLat, endLng);
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
        const errorText = await response.text();
        console.error(`Route calculation failed: ${response.status}`, errorText);
        throw new Error(`Route calculation failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      if (!data.route) {
        console.warn('No route data received, using fallback');
        return this.generateFallbackRoute(startLat, startLng, endLat, endLng);
      }
      
      console.log('Successfully retrieved route from Bhuvan API');
      return data.route;
    } catch (error) {
      console.error('Bhuvan API routing error:', error);
      // Fallback to a simple direct route if API fails
      return this.generateFallbackRoute(startLat, startLng, endLat, endLng);
    }
  }

  // Create a geofence
  async createGeofence(name, coordinates, radius) {
    try {
      // Make sure we have a valid auth token
      if (!this.authToken) {
        const authResult = await this.authenticate();
        if (authResult.success === false) {
          console.error('Authentication failed, cannot create geofence');
          return { success: false, error: 'Authentication failed' };
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
        const errorText = await response.text();
        console.error(`Geofence creation failed: ${response.status}`, errorText);
        throw new Error(`Geofence creation failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Successfully created geofence with Bhuvan API');
      return { ...data, success: true };
    } catch (error) {
      console.error('Bhuvan API geofence error:', error);
      return { success: false, error: error.message };
    }
  }

  // Check if a point is inside a geofence
  async checkGeofence(geofenceId, latitude, longitude) {
    try {
      // Make sure we have a valid auth token
      if (!this.authToken) {
        const authResult = await this.authenticate();
        if (authResult.success === false) {
          console.warn('Authentication failed, assuming point is not in geofence');
          return false;
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
        const errorText = await response.text();
        console.error(`Geofence check failed: ${response.status}`, errorText);
        return false;
      }

      const data = await response.json();
      console.log(`Geofence check result: ${data.isInside ? 'inside' : 'outside'}`);
      return data.isInside;
    } catch (error) {
      console.error('Bhuvan API geofence check error:', error);
      return false;
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
    try {
      // Make sure we have a valid auth token
      if (!this.authToken) {
        const authResult = await this.authenticate();
        if (authResult.success === false) {
          console.warn('Authentication failed, cannot get landmarks');
          return [];
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
        const errorText = await response.text();
        console.error(`Landmarks search failed: ${response.status}`, errorText);
        return [];
      }

      const data = await response.json();
      console.log(`Found ${data.landmarks ? data.landmarks.length : 0} landmarks`);
      return data.landmarks || [];
    } catch (error) {
      console.error('Bhuvan API landmarks error:', error);
      return [];
    }
  }
}

export default BhuvanAPI;