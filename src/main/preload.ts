import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  getConversations: () => ipcRenderer.invoke('get_conversations'),
  getStatistics: (conversationId: string) => ipcRenderer.invoke('get_statistics', conversationId),
});
