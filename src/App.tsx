import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div className="mt-6 px-24 container mx-auto">
      <div className="mb-6">
        <h1 className="text-indigo-500 text-center text-6xl font-bold">
          Alice and Bob
        </h1>
        <p className="text-center w-1/2 mx-auto mt-2">
          We have so many incredible moments together. 
          Here we can find another reason to celebrate. 
          Take a look how many messages we have exchanged.</p>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="col-span-2 shadow p-4">
          <p className="text-indigo-500 text-base font-medium uppercase leading-4">We have been writing to each other endlessly for</p>
          <p className="text-black font-bold text-4xl inline-flex items-center space-x-2 mt-2">
            <span>330 days</span>
          </p>
        </div>
        <div className="shadow p-4">
          <p className="text-indigo-500 text-base font-medium uppercase leading-4">In total, we sent</p>
          <p className="text-black font-bold text-4xl inline-flex items-center space-x-2 mt-2">
            <span>90974 messages</span>
          </p>
        </div>
        <div className="shadow p-4">
          <p className="text-indigo-500 text-base font-medium uppercase leading-4">Our record in one day is</p>
          <p className="text-black font-bold text-4xl inline-flex items-center space-x-2 my-2">
            <span>958 messages</span>
          </p>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.body);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
