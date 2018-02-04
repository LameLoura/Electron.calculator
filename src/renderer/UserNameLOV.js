console.log("choosing a username");

var {ipcRenderer} = require('electron');

let tbUserName = document.querySelector('#tbUserName');
let btnOK = document.querySelector('#btnOK');
let btnCancel = document.querySelector('#btnCancel');

btnOK.addEventListener('click',      function () { onUserChoose( tbUserName.value ); }, false);
btnCancel.addEventListener('click',      function () { onUserChoose( '' ); }, false);

function onUserChoose( theChosen ) { 
    theChosen = theChosen.trim();
    ipcRenderer.send('onCloudUserChosen', theChosen );
  }
