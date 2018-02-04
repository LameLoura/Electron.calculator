const config = require('../src/ConfigHandler.js');
const fs = require('fs');
const path = require('path');
const http = require('http');

exports.loadData = function performRequest( userId, callback) {
   
    var headers = {};
    var str = '';

    var options = {
            host: config.CloudWebAPI,
            path: '/api/CalculatorProfile?userName=' + userId
    };

    reponseCallback = function(response) {
            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end', function () {
                JsonData = JSON.parse(str);
                callback(  JsonData );
            });
    }
    var req = http.request(options, reponseCallback).end();
  }


exports.saveData = function( userId, JsonData ) {
    
     let data = JSON.stringify(JsonData, null, 2);

     var headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      };
      
     var options = {
             host: config.CloudWebAPI,
            // port: '52152',
             path: '/api/CalculatorProfile',
             method: 'PUT',
             headers: headers
     };
 
     let body = [];
     reponseCallback = function(response) {
             response.on('data', function (chunk) {
                body.push(chunk);
             });
             response.on('end', function () {
                body = Buffer.concat(body).toString();
                console.log('save response : ' + body );
                console.log('save data success:' );
             });
             response.on('error', (e) => {
                console.log('save data failed: ' + e );
            });
     }
     var req = http.request(options, reponseCallback);
     req.write(data);
     req.end();
}

function getEmptyData() {
    return {
        paramA: '',
        paramB: '',
        operator: '',
        result: ''
    };
}