# Bhuvan API Integration Workaround

## Problem

We encountered the following issues with the Bhuvan API integration:

1. `net::ERR_FAILED http://localhost:5000/api/auth` - Authentication failures with the proxy server
2. `Bhuvan API authentication error: TypeError: Failed to fetch` - Network errors when trying to connect to the API
3. `net::ERR_BLOCKED_BY_ORB https://bhuvan-app1.nrsc.gov.in/bhuvan2d/bhuvan/bhuvan2d.html?l=73.85,15.50,5z` - Direct access to Bhuvan services being blocked

## Solution

To work around these issues, we've implemented a mock API solution that allows development to continue while the Bhuvan API integration issues are being resolved.

### Implementation Details

1. **Mock API Server**: We've modified the proxy server (`server.js`) to return mock data instead of making actual API calls to Bhuvan services.

2. **Authentication**: The server now generates a mock authentication token instead of trying to authenticate with the Bhuvan API.

3. **API Endpoints**: All API endpoints (routing, geofence creation/checking, landmarks) now return realistic mock data that mimics the expected structure from the real API.

4. **Client-Side Handling**: The `BhuvanAPI.js` service has been updated with improved error handling to gracefully handle API failures.

### How to Use

1. Start the proxy server:
   ```
   node server.js
   ```

2. Start the React application:
   ```
   npm start
   ```

3. The application will now use mock data for all Bhuvan API interactions.

### Next Steps

Once the Bhuvan API issues are resolved, we can revert the changes in `server.js` by uncommenting the real API calls and commenting out the mock data generation.

### API Key

The current API key being used is:
```
b2946070ae0db8820e7637642d023451250b6c25
```

This key is now being used in both the proxy server and directly in the Bhuvan map iframe to ensure proper authentication.

## Technical Details

### Modified Files

1. `server.js` - Updated to provide mock data instead of making real API calls, but now tries real API first
2. `src/services/BhuvanAPI.js` - Enhanced error handling and authentication process
3. `src/components/RoutingPlan.js` - Updated to include the access token in the Bhuvan map iframe URL

### Mock Data Structure

The mock data follows the same structure as expected from the real API:

- **Authentication**: Returns a mock token
- **Routing**: Returns a route with distance, duration, and waypoints
- **Geofence Creation**: Returns a geofence ID and status
- **Geofence Checking**: Returns whether a point is inside a geofence and the distance
- **Landmarks**: Returns nearby landmarks with types and distances

### Troubleshooting

If you encounter issues with the mock API:

1. Check that the proxy server is running on port 5000
2. Verify that the React app is configured to use `http://localhost:5000/api` as the base URL
3. Check the browser console and server logs for any error messages