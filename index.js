const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned IP:', ip);
// })

// fetchCoordsByIP(fetchMyIP((error, ip) => {
//     if (error) {
//       console.log("It didn't work!", error);
//       return;
//     }
//     console.log('It worked! Returned IP:', ip);
//   }, ))

// fetchCoordsByIP('70.75.156.136', (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned coordinates: ", coordinates);
// })
  
// The code below is temporary and can be commented out.

// const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };

// fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned flyover times:' , passTimes);
// });