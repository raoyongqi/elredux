import { ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';



export function initBridge() {
// 通过 IPC 从本地文件读取数据
ipcMain.handle('read-json', async () => {
  try {
    
    // 使用 path.join 拼接文件路径
    const filePath = path.join(__dirname, '..', '..', 'common', 'data.json');

    
    // 读取 JSON 文件
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);  // 返回 JSON 数据
  } catch (error) {
    console.error('Failed to fetch local habits:', error);
    throw new Error('Failed to fetch local habits');
  }
});
}