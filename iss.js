const needle = require('needle');

/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */

const fetchMyIP = (callback) => {
  needle.get('https://api.ipify.org?format=json/', (error, response) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${response.body}`;
      return callback(Error(msg), null);
    }
    const ip = response.body;
    return callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  needle.get(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${response.body}`;
      return callback(Error(msg), null);
    }
    if (!body.success) {
      const message = `Success status was ${body.success}. Server message says: ${body.message} when fetching IP ${body.ip}`;
      return callback(Error(message), null);
    }
    const latitude = body.latitude;
    const longitude = body.longitude;
    return callback(null, {latitude, longitude});
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP };
