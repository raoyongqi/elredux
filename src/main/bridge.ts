import { ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';


import os from 'os';

export function initBridge() {
// 通过 IPC 从本地文件读取数据
ipcMain.handle('save-file', (event, content) => {
  const userRoamingPath = path.join(os.homedir(), 'AppData', 'Roaming', 'recipe-saver');  // 指定保存路径
  const filePath = path.join(userRoamingPath, 'saved.txt');  // 设置保存文件名为 saved.txt

  // 确保目标文件夹存在
  if (!fs.existsSync(userRoamingPath)) {
      fs.mkdirSync(userRoamingPath, { recursive: true });
  }

  // 使用 fs 模块将文本内容写入文件
  fs.writeFileSync(filePath, content, 'utf8');
  return `文件已保存到：${filePath}`;
});

// 监听文件读取请求
ipcMain.handle('read-file', (event) => {
  const userRoamingPath = path.join(os.homedir(), 'AppData', 'Roaming', 'recipe-saver');  // 指定保存路径
  const filePath = path.join(userRoamingPath, 'saved.txt');  // 文件路径

  // 检查文件是否存在
  if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      return fileContent;  // 返回文件内容
  } else {
      throw new Error('文件不存在');
  }
});



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