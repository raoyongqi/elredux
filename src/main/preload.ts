import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    readJson: () => ipcRenderer.invoke('read-json') ,
});
