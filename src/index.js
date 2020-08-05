const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const channels = require("./render/js/channels");
const library = require("./main/library");

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        minHeight: 600,
        minWidth: 400,
        frame: false,
        webPreferences: {
            nodeIntegration: false,
            preload: path.resolve(__dirname, './main/preload.js')
        }
    });

    win.loadFile("src/render/index.html");
    win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

ipcMain.on(channels.APP_CLOSE, () => {
    win.close();
});

ipcMain.on(channels.LIBRARY_GET, (event) => {
    event.reply(channels.LIBRARY_GET, library.getRootDir(), library.getLibrary());
});

ipcMain.on(channels.LIBRARY_ROOT_DIR, (event) => {
    const dir = dialog.showOpenDialogSync(win, {
        properties: ['openDirectory'],
        filters: [
            { name: "Music", extensions: [".mp3", ".m4a"] }
        ]
    });

    if (dir) {
        library.setRootDir(dir[0]);
        event.reply(channels.LIBRARY_GET, dir[0], library.getLibrary());
    }
});