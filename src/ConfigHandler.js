console.log('loading application config data..');
const fs = require('fs');

//read data
let rawdata = fs.readFileSync('./config.json');  
let configJson = JSON.parse(rawdata);  
console.log(configJson);  


module.exports = configJson;