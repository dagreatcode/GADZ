import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import styles from "./MessageUser.module.css";
import Snake from "./Snake";

interface Message {
  sender: string; // Updated to 'sender'
  receiver: string; // Updated to 'receiver'
  content: string;
}

interface User {
  id: string;
  email: string;
}

const ServerPort =
  process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";
const socket = io(`${ServerPort}`, { secure: true, rejectUnauthorized: false });

const MessageUser: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [receiverId, setReceiverId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setCurrentUserId(userId);
      socket.emit("userJoined", userId); // Notify server of user join
    }

    const fetchMessages = async () => {
      try {
        const res = await axios.get<Message[]>(
          `${ServerPort}/api/message/cheat`
        );
        if (Array.isArray(res.data)) {
          setMessages(res.data);
        } else {
          setError("Unexpected response format.");
        }
      } catch (error) {
        console.error("Network error:", error);
        setError("Failed to fetch messages. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await axios.get<User[]>(`${ServerPort}/api/user/view`);
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users.");
      }
    };

    fetchMessages();
    fetchUsers();

    socket.on("receiveMessage", (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = async () => {
    if (message.trim() && currentUserId && receiverId) {
      const newMessage: Message = {
        sender: currentUserId, // Updated to 'sender'
        receiver: receiverId, // Updated to 'receiver'
        content: message,
      };

      try {
        socket.emit("sendMessage", newMessage); // Emit the new message
        setMessage(""); // Clear the message input
      } catch (error) {
        console.error("Error sending message:", error);
        setError("Failed to send message. Please try again.");
      }
    }
  };

  return (
    <div className={styles.messageContainer}>
      <h2 className={styles.title}>Chat Application</h2>
      <select
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
        className={styles.dropdown}
      >
        <option value="">Select a user to message</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.email}
          </option>
        ))}
      </select>
      <div className={styles.messageArea}>
        {loading && <div className={styles.loading}>Loading messages...</div>}
        {error && <div className={styles.error}>{error}</div>}
        {!loading && !error && messages.length === 0 && (
          <div>No messages to display.</div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={styles.message}>
            <strong>{msg.sender}:</strong> {msg.content}{" "}
            {/* Updated to 'sender' */}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={styles.inputField}
      />
      <button onClick={sendMessage} className={styles.sendButton}>
        Send
      </button>
      <div>
        <Snake /> {/* Include the Snake game */}
      </div>
    </div>
  );
};

export default MessageUser;
