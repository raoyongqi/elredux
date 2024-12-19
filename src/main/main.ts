import { app, BrowserWindow,dialog } from 'electron';
// import { bindWindowEvent } from './services/window-control';
// import installExtension, {
//     REACT_DEVELOPER_TOOLS,
//     REDUX_DEVTOOLS,
//   } from 'electron-devtools-installer';
import { initBridge } from './bridge';
import { greet } from '../common/constants' // 引用common中的utils
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer';
import path from 'path';
// import { configureLog4js, reportCrash } from './log';

async function main() {
    // configureLog4js()

    await app.whenReady();

    
    initBridge();
    console.log(greet('Electron User')) // 在控制台打印问候信息

    const  win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),  // 指定 preload 文件
            contextIsolation: true,  // 启用上下文隔离
            nodeIntegration: false,  // 禁用 Node.js 集成
        },
        title: 'saveToLocal',
        frame: false,
    });


    win.removeMenu();

    if (app.requestSingleInstanceLock()) {
        app.on('second-instance', () => {
          if (win.isMinimized()) {
            win.restore();
          }
          win.focus();
        });
      } else {
        // 第二个实例，退出。
        app.quit();
        return;
      }
    


  if (process.env.NODE_ENV === 'development') {
    await installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS]);
    win.once('show', () => win.webContents.openDevTools());

    await win.loadURL('http://localhost:5173');
  } else {
    await win.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));

  }

    app.on('browser-window-created', (ev, window) => {
        window.removeMenu();
    
    if (process.env.NODE_ENV === 'development') {
    window.once('show', () => window.webContents.openDevTools());
    }
    window.once('ready-to-show', () => {
    // 绑定 windowControl 事件。
    const url = new URL(window.webContents.getURL());

    // Hash 代表窗口名字
    // if (url.hash) {
    //     bindWindowEvent(window, url.hash);
    // }
        });
    });
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

}

main()


