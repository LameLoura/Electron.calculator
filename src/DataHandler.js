const config = require('../src/ConfigHandler.js');
const fs = require('fs');
const path = require('path');

var appDir = path.dirname(require.main.filename) + "/../../" + config.dataFile;
loadData();

function loadData() {

    fs.readFile( appDir  , (err, data) => {

        if (err) {
            console.log('Could not find data to load...' + err );
            return;
        }

        let JsonData = JSON.parse(data);
        saveData( JsonData );
    });
}

function saveData( JsonData ) {

    JsonData.times = eval( JsonData.times ) + 1;

    let data = JSON.stringify(JsonData, null, 2);

    fs.writeFile( appDir , data, (err) => {  
         if (err) {
            console.log('Could not save data...' + err );
            return;
        }
        console.log('Data saved successfully');
    });
}