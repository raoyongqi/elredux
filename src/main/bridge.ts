import { ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';



export function initBridge() {
// 通过 IPC 从本地文件读取数据
ipcMain.handle('read-json', async () => {

  const filePath = path.join(__dirname, '..', '..', 'common', 'data.txt');

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const lines = data.split('\n').map(line => line.trim()); // 分割每行并去除多余的空白
        resolve(lines);
      }
    });
  });

});



ipcMain.handle('save-habits', (event, updatedHabits) => {
  // 直接指定文件保存路径
  const filePath = path.join(__dirname, '..', '..', 'common', 'data.txt'); // 设置保存路径

  // 保存文件
  fs.writeFile(filePath, updatedHabits, 'utf8', (err) => {
    if (err) {
      console.error('Failed to save the file:', err);
    } else {
      console.log('File saved successfully:', filePath);
    }
  });
});

}