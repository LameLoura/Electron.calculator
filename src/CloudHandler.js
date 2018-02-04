const config = require('../src/ConfigHandler.js');
const fs = require('fs');
const path = require('path');
var https = require('https');

exports.loadData = function performRequest( userId, callback) {
   
    var headers = {};
    var http = require('http');
    var str = '';

    var options = {
            host: config.CloudWebAPI, 
            //port: 52152,
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


exports.saveData = function( JsonData ) {
    
    // let data = JSON.stringify(JsonData, null, 2);

    // fs.writeFile( appDir , data, (err) => {  
    //      if (err) {
    //         console.log('Could not save data...' + err );
    //         return;
    //     }
    //     console.log('Data saved successfully');
    // });
}

function getEmptyData() {
    return {
        paramA: '',
        paramB: '',
        operator: '',
        result: ''
    };
}