import { useState, useEffect } from 'react';
import { Conversation } from './data_types';

export default function SelectConversation({ onSelect }) {
    const [conversations, setConversations]: [Conversation[], any] = useState([]);
    const [conversationId, setConversationId]: [string, any] = useState('');
    useEffect(() => {
        window.electronAPI.getConversations()
            .then((res: any) => {
                setConversationId(res.length ? res[0].id : '');
                setConversations(res);
            });
    }, []);

    return (
        <div className="mt-6 px-24 container mx-auto">
            <div className="mt-24 mb-12">
                <h1 className="text-indigo-500 text-center text-6xl font-bold">
                Welcome!
                </h1>
                <h2 className="mt-4 text-indigo-400 text-center text-4xl font-bold">
                    It is time to signal your love
                </h2>
            </div>
            <div className="max-w-2xl mx-auto">
                <label htmlFor="countries" className="block mt-24 mb-2 text-1xl font-bold text-gray-600">Select a conversation</label>
                <select value={conversationId} onInput={e => setConversationId(e.target.value)} id="conversations" className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                    {conversations.map(function(convo, _){
                        return (
                            <option key={convo.id} value={convo.id}>{convo.name}</option>
                        )
                    })}
                </select>
            </div>
            <button onClick={() => onSelect(conversationId)} className="mt-12 block uppercase mx-auto shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white text-1xl py-3 px-10 rounded">
                Show statistics
            </button>
        </div>
    );
}
