import { Link } from "react-router-dom";
// src/Chat.tsx
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001"); // Replace with your server URL

interface Message {
  user: string;
  text: string;
}

const MessageUser: React.FC = () => {
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
    <>
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
      </div>
      <Link to="/User">Home</Link>
      <br />
    </>
  );
};

export default MessageUser;
