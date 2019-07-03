const electron = require('electron');
const app = electron.app;
const url = require('url');
const path = require('path');

let mainWindow;

function createWindow()
{
    mainWindow = new electron.BrowserWindow({
        width: 1024,
        height: 768
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () =>{
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () =>{ //Terminates app if platform isn't MAC Os
    if(process.platform !== 'darwin')
    {
        app.quit();
    }
});

app.on('activate', ()=> {
    if(mainWindow === null)
    {
        createWindow();
    }
})