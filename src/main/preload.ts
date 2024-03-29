/*
  Author(s): Vladyslav Moisieienkov
  License: GNU General Public License version 3 (GPL-3.0)
*/

import { contextBridge, ipcRenderer } from 'electron'
import { APIGetConversations, APIGetStatistics } from '../types.d';

const getConversations: APIGetConversations = () => ipcRenderer.invoke('get_conversations');
const getStatistics: APIGetStatistics = (conversationId: string) => ipcRenderer.invoke('get_statistics', conversationId);

contextBridge.exposeInMainWorld('electronAPI', {
  getConversations,
  getStatistics,
});
