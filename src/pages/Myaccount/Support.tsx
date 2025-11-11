import React, { useState } from 'react';
import { FaArrowLeft, FaTimes, FaPhoneAlt, FaCommentDots } from 'react-icons/fa';
import { HiOutlineUserCircle } from 'react-icons/hi2'; // For the generic user icon

// --- Sub-Components ---

interface ContactOptionProps {
  icon: React.ReactNode;
  label: string;
  time: string;
  onClick: () => void;
}

const ContactOptionCard: React.FC<ContactOptionProps> = ({ icon, label, time, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full md:w-5/12 bg-white border border-gray-300 rounded-xl shadow-md p-4 flex flex-col items-center hover:bg-gray-50 transition duration-150"
  >
    <div className="text-teal-600 text-3xl mb-2">{icon}</div>
    <p className="font-semibold text-gray-800">{label}</p>
    <p className="text-sm text-gray-500">{time}</p>
  </button>
);

const ChatBubble: React.FC<{ sender: 'bot' | 'user'; message: string }> = ({ sender, message }) => (
  <div className={`flex mb-4 ${sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
    {sender === 'bot' && (
      <div className="flex-shrink-0 mr-3">
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold text-gray-700">
          R
        </div>
      </div>
    )}
    <div 
      className={`max-w-xs p-3 rounded-xl shadow-sm ${
        sender === 'bot' 
          ? 'bg-gray-200 text-gray-800 rounded-tl-none' 
          : 'bg-teal-500 text-white rounded-br-none'
      }`}
    >
      {message}
    </div>
  </div>
);


// --- Main Component: Support ---

const Support: React.FC = () => {
  // 'view' controls which part of the screen is visible: 'options' or 'chat'
  const [view, setView] = useState<'options' | 'chat'>('options');
  const [message, setMessage] = useState('');

  const handleGoBack = () => {
    if (view === 'chat') {
      setView('options'); // Go back from chat to options
    } else {
      console.log("Closing Help and Support...");
      // navigate(-1) or close the modal/page
    }
  };

  const handleClose = () => {
    console.log("Closing Help and Support completely.");
    // Close the modal/page
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
        console.log("Sending message:", message);
        // Add logic to submit message and receive response
        setMessage('');
    }
  };

  const initialBotMessage = "Welcome to support, My name is Ruhina. How are you today?";

  return (
    <div className="bg-white min-h-screen font-sans border border-gray-200">
      
      {/* --- HEADER --- */}
      <header className="flex items-center justify-between p-4 border-b">
        <button onClick={handleGoBack} className="text-gray-700 hover:text-teal-600 transition">
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">
          {view === 'options' ? 'Help and Support' : 'Help'}
        </h1>
        <button onClick={handleClose} className="text-gray-700 hover:text-red-500 transition">
          <FaTimes size={20} />
        </button>
      </header>
      
      {/* --- CONTENT AREA --- */}
      <div className="p-4">
        
        {/* VIEW 1: Contact Options */}
        {view === 'options' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Contact Options</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <ContactOptionCard 
                icon={<FaPhoneAlt />}
                label="Call"
                time="Available 24/7"
                onClick={() => console.log("Initiating call...")}
              />
              <ContactOptionCard 
                icon={<FaCommentDots />}
                label="Chat"
                time="8am - 12am IST"
                onClick={() => setView('chat')}
              />
            </div>
          </div>
        )}

        {/* VIEW 2: Chat Interface */}
        {view === 'chat' && (
          <div className="flex flex-col h-[calc(100vh-120px)]"> 
            
            {/* Chat History Area (Scrollable) */}
            <div className="flex-1 overflow-y-auto pb-4">
              <ChatBubble sender="bot" message={initialBotMessage} />
              {/* More messages would be rendered here */}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="mt-auto">
              <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-md px-4 py-2">
                <input
                  type="text"
                  placeholder="Send a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 focus:outline-none text-gray-700 placeholder-gray-500"
                />
                <button type="submit" className="text-teal-600 hover:text-teal-700 ml-3 disabled:text-gray-400" disabled={!message.trim()}>
                  <HiOutlineUserCircle size={24} /> 
                  {/* Note: The send icon is typically a paper plane, but using a user icon 
                       here as a placeholder since the screenshot shows no distinct send button, 
                       just a user avatar placeholder in the input box for some contexts. 
                       I will use the text submit for simplicity. */}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;