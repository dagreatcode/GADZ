import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

interface Message {
  sender: string;
  receiver: string;
  content: string;
}

const socket = io("http://gadzconnect.com:3002"); // Backend Socket.IO server
// const socket = io("http://localhost:3002"); // Backend Socket.IO server

const MessageUser: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState<string>("");
  const [receiver, setReceiver] = useState<string>(""); // Add receiver state

  useEffect(() => {
    // Fetch previous messages from the server
    const fetchMessages = async () => {
      try {
        const res = await axios.get<Message[]>(
          // "http://localhost:3001/messages"
          "/messages"
        );
        setMessages(res.data);
      } catch (error) {
        console.error("Network error:", error);
      }
    };
    fetchMessages();

    // Listen for incoming messages from Socket.IO
    socket.on("receiveMessage", (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = async () => {
    if (message.trim() && username.trim() && receiver.trim()) {
      const newMessage: Message = {
        sender: username,
        receiver: receiver,
        content: message,
      };

      try {
        // Send message to the server
        await socket.emit("sendMessage", newMessage);

        // Update the message locally (optimistic update)
        setMessages([...messages, newMessage]);
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ margin: "10px", padding: "5px" }}
      />
      <input
        type="text"
        placeholder="Enter receiver's username"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        style={{ margin: "10px", padding: "5px" }}
      />
      <div style={{ margin: "20px 0" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: "10px 0" }}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ margin: "10px", padding: "5px" }}
      />
      <button onClick={sendMessage} style={{ padding: "10px 20px" }}>Send</button>
    </div>
  );
};

export default MessageUser;
