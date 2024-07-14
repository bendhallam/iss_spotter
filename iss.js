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
  // fetch ip address
  needle.get('https://api.ipify.org?format=json/', (error, response) => {
    // if there is an error, send the error to the callback with no response parameter
    if (error) {
      return callback(error, null);
    }
    // check if there are any error codes (ie. any status code other than 200), and send an error message to the callback with no response parameter
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${response.body}`;
      return callback(Error(msg), null);
    }
    // save the ip address and send it to the callback with no error parameter
    const ip = response.body;
    return callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  // fetch information using ip address
  needle.get(`http://ipwho.is/${ip}`, (error, response, body) => {
    // if there is an error, send the error to the callback with no response parameter
    if (error) {
      return callback(error, null);
    }
    // check if there are any error codes (ie. any status code other than 200), and send an error message to the callback with no response parameter
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${response.body}`;
      return callback(Error(msg), null);
    }
    // check if url produces invalid ip JSON file and if so, send the error message to the callback with no response parameter
    if (!body.success) {
      const message = `Success status was ${body.success}. Server message says: ${body.message} when fetching IP ${body.ip}`;
      return callback(Error(message), null);
    }
    // save the latitude and longitude and send both to the callback with no error parameter
    const latitude = body.latitude;
    const longitude = body.longitude;
    return callback(null, {latitude, longitude});
  });
};


const fetchISSFlyOverTimes = (coords, callback) => {
  // fetch information using coordinates
  needle.get(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
     // if there is an error, send the error to the callback with no response parameter
    if (error) {
      return callback(error, null);
    }
    // check if there are any error codes (ie. any status code other than 200), and send an error message to the callback with no response parameter
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    // save content of url to variable and send info to callback with no error parameter
    const passes = body.response;
    callback(null, passes);
  })
}



module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
