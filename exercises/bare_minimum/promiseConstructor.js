/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
const https = require('https');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString().split('\n')[0]);
      }
    });
  });
};


// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  https.get(url, (resp) => {
    const { statusCode } = resp;
    callback(null, statusCode);
    resp.on('end', () => {
    });
  }).on("error", 
  (err) => {
    err['message'] = "Invalid URI";
    console.log(err.message);
    callback(err);
  });
};

var error = {message: 'Invalid URI'};
// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (resp) => {
      const { statusCode } = resp; 
      resolve(statusCode); 
      resp.on('end', () => {});
    }).on("error", (err) => {
      err['message'] = "Invalid URI";
      reject(err);
    });
  })
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
