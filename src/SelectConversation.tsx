import React, { useState, useEffect } from 'react';
import { Conversation } from './types.d';

export default function SelectConversation({ conversations, onSelect }: { conversations: Conversation[], onSelect: (convoId: string) => void }) {
    const [conversationId, setConversationId]: [string, any] = useState('');

    const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
        const target = e.target as HTMLSelectElement;
        setConversationId(target.value);
    }

    useEffect(() => {
        if (conversations.length > 0) {
            setConversationId(conversations[0].id);
        }
    }, [conversations]);

    return (
        <div className="mt-6 px-24 container mx-auto">
            <div className="mt-12 mb-4 lg:mt-24 lg:mb-12">
                <h1 className="text-rose-500 text-center text-6xl font-bold">
                Welcome!
                </h1>
                <h2 className="mt-4 text-rose-400 text-center text-4xl font-bold">
                    It is time to signal your love
                </h2>
            </div>
            <div className="mt-12 lg:mt-24 max-w-2xl mx-auto">
                <label htmlFor="countries" className="block mb-2 text-1xl font-bold text-gray-700">Select a conversation</label>
                <select value={conversationId} onInput={onInput} id="conversations" className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                    {conversations.map(function(convo, _){
                        return (
                            <option key={convo.id} value={convo.id}>{convo.name}</option>
                        )
                    })}
                </select>
            </div>
            <button onClick={() => onSelect(conversationId)} className="mt-12 block uppercase mx-auto shadow bg-rose-500 hover:bg-rose-400 focus:shadow-outline focus:outline-none text-white text-1xl py-3 px-10 rounded">
                Show statistics
            </button>
            <div className="mt-12 lg:mt-24">
                <h2 className="text-center mb-4 text-1xl text-gray-700">
                    If you like the app, consider <a target="_blank" href="https://signalyourlove.app/donate" className="font-medium text-rose-500 hover:underline">donating</a> to support the project. Thank you!
                </h2>
                <h2 className="text-center text-sm text-gray-700">
                    Created by <a target="_blank" href="https://vmois.dev" className="font-medium text-rose-500 hover:underline">Vladyslav Moisieienkov</a>
                </h2>
            </div>
        </div>
    );
}
