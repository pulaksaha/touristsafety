// EnvironmentConfig.js - Simple environment detection for GitHub Pages

class EnvironmentConfig {
  static isGitHubPages() {
    return window.location.hostname === 'pulaksaha.github.io' || 
           window.location.hostname.includes('github.io');
  }
  
  static getBaseUrl() {
    if (this.isGitHubPages()) {
      // For GitHub Pages, we'll use mock data
      return null;
    }
    // For local development, use the backend server
    return 'http://localhost:5000/api';
  }
}

export default EnvironmentConfig;
