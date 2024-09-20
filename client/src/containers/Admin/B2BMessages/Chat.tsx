// src/Chat.tsx
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";

const URL = "http://localhost:3001";
const socket = io(URL); // Replace with your server URL

// const socket = io("http://localhost:3001", {
//   autoConnect: false,
// });

interface Message {
  user: string;
  text: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [
    user,
    // , setUser
  ] = useState("User");

  useEffect(() => {
    socket.on("message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = () => {
    const newMessage: Message = { user, text: message };
    socket.emit("message", newMessage);
    setMessage("");
  };

  return (
    <div>
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
      <Link to="/User">Home</Link>
    </div>
  );
};

export default Chat;
