import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import Display from './Display';
import SelectConversation from './SelectConversation';

function App() {
    const [conversationId, setConversationId]: [string, any] = useState('');
    const [statistics, setStatistics]: [any, any] = useState({});

    const handleSelect = (convoId: string) => setConversationId(convoId);
    const handleExit = () => setConversationId('');

    useEffect(() => {
      if (conversationId) {
        window.electronAPI.getStatistics(conversationId)
          .then((res: any) => setStatistics(res));
      }
    }, [conversationId]);

    let toDisplay;
    if (conversationId) {
      toDisplay = <Display statistics={statistics} onExit={handleExit} />;
    } else {
      toDisplay = <SelectConversation onSelect={handleSelect} />;
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
