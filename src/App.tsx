import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import Display from './Display';
import SelectConversation from './SelectConversation';
import ErrorView from './ErrorView';
import { Conversation, Statistics } from './types.d';

function App() {
    const [conversations, setConversations]: [Conversation[], any] = useState([]);
    const [statistics, setStatistics]: [any, any] = useState({});
    const [conversationId, setConversationId]: [string, (convoId: string) => void] = useState('');
    const [errorMessage, setErrorMessage]: [string, (msg: string) => void] = useState('');

    const handleSelect = (convoId: string): void => setConversationId(convoId);
    const handleExit = () => setConversationId('');

    useEffect(() => {
      if (conversationId) {
        setStatistics({});
        const getStatistics = async () => {
          const result = await window.electronAPI.getStatistics(conversationId);
          if (result.isOk === false) {
            setErrorMessage(result.error);
          } else {
            setErrorMessage('');
            setStatistics(result.value);
          }
        };
        getStatistics();
      }
    }, [conversationId]);

    useEffect(() => {
      const getConversations = async () => {
        const result = await window.electronAPI.getConversations();
        if (result.isOk === false) {
          setErrorMessage(result.error);
        } else {
          setErrorMessage('');
          setConversations(result.value);
        }
      };
      getConversations();
    }, []);

    let toDisplay;
    if (errorMessage) {
      toDisplay = <ErrorView message={errorMessage} />;
    } else if (conversationId) {
      toDisplay = <Display statistics={statistics} onExit={handleExit} />;
    } else {
      toDisplay = <SelectConversation conversations={conversations} onSelect={handleSelect} />;
    }
    return (
      <div className="mt-6 px-24 container mx-auto">
        {toDisplay}
      </div>
    )
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
