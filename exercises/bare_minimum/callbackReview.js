/**
 * Implement these functions following the node style callback pattern
 */
var fs = require('fs');
var request = require('request');
const https = require('https');
var Promise = require('bluebird')



// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data.toString().split("\n")[0]);
    }
  })
};

var error = {message: 'Invalid URI'};
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

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
