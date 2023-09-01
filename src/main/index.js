/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { app, shell, BrowserWindow } from 'electron'
import path from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { fileURLToPath } from 'url'
import { ipcMain } from 'electron'
import fs from 'node:fs'

const _dirname = path.dirname(fileURLToPath(import.meta.url))

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: 'Videobox LyA',
    fullscreen: true,
    width: 1024,
    height: 768,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(_dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(_dirname, '../renderer/index.html'))
  }
}

// Comprueba que el disco D: exista
ipcMain.handle('search-disk', (event, data) => {
  try {
    if (!fs.existsSync(import.meta.env.MAIN_VITE_DISK)) return true
    return false
  } catch (error) {
    console.error(error)
  }
})

// Listen for the 'save-file' message from the renderer process
ipcMain.on('save-file', (event, data) => {
  const { fileName, arrayBuffer } = data

  const file = Buffer.from(arrayBuffer)
  const filePath = `${import.meta.env.MAIN_VITE_DISK}/${fileName}`
  console.log(file)

  // Save the file without showing the save dialog
  fs.writeFileSync(filePath, file, { mode: 0o644 }, (err) => {
    if (err) {
      console.error('Error saving video:', err)
      event.reply('save-video-response', { success: false, error: err })
      return
    }

    console.log('Video saved successfully.')
    event.reply('save-video-response', { success: true })
  })
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
