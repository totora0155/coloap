'use strict';

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const fs = require('fs');
const path = require('path');
// console.log(process.cwd());
// const storage = require('./src/scripts/modules/storage');
// const util = require('./util');
// const co = require('co');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// const initialData = {
//   folder: {},
//   color: [],
// };

function createWindow () {
  // co(function* () {
  //   const dir = yield util.stat(storage.dataDir, (stats) => {
  //     return stats.isDirectory();
  //   });
  //   dir || yield util.mkdir(storage.dataDir);
  //
  //   const datapath = path.join(storage.dataDir, 'data.json');
  //   const data = yield util.stat(datapath, (stats) => {
  //     return stats.isFile();
  //   });
  //
  //   data || yield util.writeFile(datapath, initialData);
  // }).catch(err => {
  //   console.error(err);
  // });


  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1100, height: 700});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
