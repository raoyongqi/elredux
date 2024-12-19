import { app, BrowserWindow } from 'electron'
import path from 'path'
import { greet } from '../common/constants' // 引用common中的utils

let win: BrowserWindow | null = null

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  console.log(greet('Electron User')) // 在控制台打印问候信息

  // 开发模式下加载 React 应用的 URL
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173') // React 的开发服务器地址
  } else {
    // 生产模式下加载 React 构建后的静态文件
    win.loadFile(path.join(__dirname, 'build', 'index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
