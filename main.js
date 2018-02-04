console.log("starting application...");


const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const path = require('path')
const url = require('url')


let win;
var userLOVWindow;

function createWindow () {

  win = new BrowserWindow({width: 400, height: 600});

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'HTML/Javascript/main.html'),
    protocol: 'file:',
    slashes: true
  }));

  //win.webContents.openDevTools();
  
  win.on('closed', () => {
    win = null
  });
}

app.on('ready', createWindow);


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
  
});

//events
ipcMain.on('chooseCloud', (event) => {
  
  if( userLOVWindow == null ) {

    userLOVWindow = new BrowserWindow({parent: win, width: 400, height: 200 });
    userLOVWindow.loadURL( path.join(__dirname, 'HTML/Javascript/UserNameLOV.html') );
    
    //userLOVWindow.webContents.openDevTools();
    userLOVWindow.on('closed', () => {
      userLOVWindow = null
    });
    userLOVWindow.once('ready-to-show', () => {
        userLOVWindow.show();
    });

  }
});

ipcMain.on('onCloudUserChosen', (event, chosenUser) => { 
  userLOVWindow.close();
  win.webContents.send( 'onCloudUserChosen' , chosenUser );
});