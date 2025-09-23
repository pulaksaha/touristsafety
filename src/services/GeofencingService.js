// GeofencingService.js - Service for geofencing functionality

class GeofencingService {
  constructor(bhuvanAPI) {
    this.bhuvanAPI = bhuvanAPI;
    this.geofences = [];
    this.activeGeofenceId = null;
  }

  // Create a new geofence
  async createGeofence(name, latitude, longitude, radius) {
    try {
      const geofence = await this.bhuvanAPI.createGeofence(name, { latitude, longitude }, radius);
      this.geofences.push(geofence);
      return geofence;
    } catch (error) {
      console.error('Error creating geofence:', error);
      // Create a local geofence if API fails
      const localGeofence = {
        id: `local-${Date.now()}`,
        name,
        center: { latitude, longitude },
        radius
      };
      this.geofences.push(localGeofence);
      return localGeofence;
    }
  }

  // Set active geofence
  setActiveGeofence(geofenceId) {
    this.activeGeofenceId = geofenceId;
  }

  // Check if a point is inside the active geofence
  async isPointInActiveGeofence(latitude, longitude) {
    if (!this.activeGeofenceId) return false;
    
    try {
      // Try to use Bhuvan API first
      return await this.bhuvanAPI.checkGeofence(this.activeGeofenceId, latitude, longitude);
    } catch (error) {
      console.error('Error checking geofence with API:', error);
      // Fall back to local calculation
      return this.isPointInGeofenceLocal(this.activeGeofenceId, latitude, longitude);
    }
  }

  // Local calculation for point in geofence
  isPointInGeofenceLocal(geofenceId, latitude, longitude) {
    const geofence = this.geofences.find(g => g.id === geofenceId);
    if (!geofence) return false;

    // Calculate distance between point and geofence center
    const distance = this.calculateDistance(
      latitude,
      longitude,
      geofence.center.latitude,
      geofence.center.longitude
    );

    // Check if distance is less than radius
    return distance <= geofence.radius;
  }

  // Calculate distance between two points using Haversine formula
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  }

  // Get all geofences
  getGeofences() {
    return this.geofences;
  }

  // Get active geofence
  getActiveGeofence() {
    return this.geofences.find(g => g.id === this.activeGeofenceId);
  }

  // Delete a geofence
  deleteGeofence(geofenceId) {
    this.geofences = this.geofences.filter(g => g.id !== geofenceId);
    if (this.activeGeofenceId === geofenceId) {
      this.activeGeofenceId = null;
    }
  }

  // Create geofences along a route
  async createRouteGeofences(route, radius = 100, spacing = 500) {
    const geofences = [];
    let distance = 0;
    let lastPoint = route[0];

    for (let i = 1; i < route.length; i++) {
      const point = route[i];
      const segmentDistance = this.calculateDistance(
        lastPoint.latitude,
        lastPoint.longitude,
        point.latitude,
        point.longitude
      );

      distance += segmentDistance;

      // Create a geofence at regular intervals
      if (distance >= spacing) {
        const name = `Route Checkpoint ${geofences.length + 1}`;
        const geofence = await this.createGeofence(name, point.latitude, point.longitude, radius);
        geofences.push(geofence);
        distance = 0;
      }

      lastPoint = point;
    }

    // Always add a geofence at the destination
    const destination = route[route.length - 1];
    const destinationGeofence = await this.createGeofence(
      'Destination',
      destination.latitude,
      destination.longitude,
      radius
    );
    geofences.push(destinationGeofence);

    return geofences;
  }
}

export default GeofencingService;