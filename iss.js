const needle = require('needle');
/**
 * Makes a single API request to retrieve the user's IP address
 * Input:
 *  - A callback (to pass back an error or the IP string)
 * Returns:
 *  - An error, if any (nullable)
 *  - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = (callback) => {
  needle.get('https://api.ipify.org?format=json/', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${response.body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = body.ip
    return callback(null, ip);
  });
};

module.exports = { fetchMyIP };
