const config = require('../src/ConfigHandler.js');
const fs = require('fs');
const path = require('path');

var appDir = path.dirname(require.main.filename) + "/../../" + config.dataFile;

exports.loadData = function( callback ) {
   
    let JsonData;

    fs.readFile( appDir  , (err, data) => {
        if (err) {
            console.log('Could not find data to load...' + err );
            JsonData = getEmptyData();
        }
        else {
            JsonData = JSON.parse(data);
        }
        
        //callback the function with json data
        callback ( JsonData );
    });
  };

exports.saveData = function( JsonData ) {
    
    let data = JSON.stringify(JsonData, null, 2);

    fs.writeFile( appDir , data, (err) => {  
         if (err) {
            console.log('Could not save data...' + err );
            return;
        }
        console.log('Data saved successfully');
    });
}

function getEmptyData() {
    return {
        paramA: '',
        paramB: '',
        operator: '',
        result: ''
    };
}