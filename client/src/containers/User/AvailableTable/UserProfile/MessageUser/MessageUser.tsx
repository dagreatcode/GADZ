import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:3001');

interface Message {
  user: string;
  text: string;
}

const MessageUser: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // Fetch initial messages from the server
    axios.get('http://localhost:3001/messages')
      .then(response => setMessages(response.data))
      .catch(error => console.error('Error fetching messages:', error));

    // Listen for new messages
    socket.on('receiveMessage', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    const newMessage: Message = { user: 'User', text: message };
    socket.emit('sendMessage', newMessage);
    setMessage('');
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageUser;