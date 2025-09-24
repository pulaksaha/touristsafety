// MockDataGenerator.js - Simple mock data generator for GitHub Pages

class MockDataGenerator {
  static generateRoute(startLat, startLng, endLat, endLng) {
    const points = [];
    const steps = 15;
    
    for (let i = 0; i <= steps; i++) {
      const fraction = i / steps;
      const lat = startLat + (endLat - startLat) * fraction;
      const lng = startLng + (endLng - startLng) * fraction;
      
      // Add some realistic variation
      const variation = 0.001 * Math.sin(fraction * Math.PI);
      points.push({
        latitude: lat + variation,
        longitude: lng + variation * 0.5
      });
    }
    
    return {
      distance: this.calculateDistance(startLat, startLng, endLat, endLng),
      duration: Math.round(this.calculateDistance(startLat, startLng, endLat, endLng) * 2),
      points: points
    };
  }
  
  static calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
  
  static generateLandmarks(latitude, longitude, radius = 1000) {
    const landmarkTypes = [
      { name: 'Hospital', type: 'healthcare', icon: '🏥' },
      { name: 'Police Station', type: 'emergency', icon: '🚔' },
      { name: 'Fuel Station', type: 'service', icon: '⛽' },
      { name: 'Restaurant', type: 'food', icon: '🍽️' },
      { name: 'ATM', type: 'service', icon: '🏧' },
      { name: 'Pharmacy', type: 'healthcare', icon: '💊' }
    ];
    
    const landmarks = [];
    const numLandmarks = Math.floor(Math.random() * 4) + 3; // 3-6 landmarks
    
    for (let i = 0; i < numLandmarks; i++) {
      const type = landmarkTypes[Math.floor(Math.random() * landmarkTypes.length)];
      const angle = (Math.PI * 2 * i) / numLandmarks + Math.random() * 0.5;
      const distance = Math.random() * (radius / 1000);
      
      const lat = latitude + (distance * Math.cos(angle) * 0.01);
      const lng = longitude + (distance * Math.sin(angle) * 0.01);
      
      landmarks.push({
        id: `landmark_${i + 1}`,
        name: `${type.name} ${i + 1}`,
        type: type.type,
        icon: type.icon,
        latitude: lat,
        longitude: lng,
        distance: distance * 1000
      });
    }
    
    return landmarks;
  }
  
  static generateGeofence(name, coordinates, radius) {
    return {
      success: true,
      id: 'geofence_' + Date.now(),
      name: name,
      status: 'active'
    };
  }
  
  static checkGeofence(geofenceId, latitude, longitude) {
    // Randomly return true/false for demo
    return Math.random() > 0.5;
  }
}

export default MockDataGenerator;
