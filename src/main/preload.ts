import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  readJson: () => ipcRenderer.invoke('read-json'),
  // 传递习惯列表给主进程并保存
  saveHabits: (habits: string) => ipcRenderer.invoke('save-habits', habits)
});

