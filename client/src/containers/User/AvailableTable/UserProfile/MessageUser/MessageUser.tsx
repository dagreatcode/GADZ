import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import styles from "./MessageUser.module.css";
import truckImage from "./GADZShip.png";
import { Link, useParams } from "react-router-dom";

interface Message {
  sender: string;
  receiver: string;
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
  const { userId: initialReceiverId } = useParams<{ userId: string }>();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [receiverId, setReceiverId] = useState<string>(initialReceiverId || "");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setCurrentUserId(userId);
      socket.emit("userJoined Hi", userId);
    }

    const fetchMessages = async () => {
      try {
        const res = await axios.get<Message[]>(`${ServerPort}/api/message/cheat`);
        setMessages(Array.isArray(res.data) ? res.data : []);
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
  }, [currentUserId]);

  const sendMessage = () => {
    if (message.trim() && currentUserId && receiverId) {
      const newMessage: Message = {
        sender: currentUserId,
        receiver: receiverId,
        content: message,
      };

      socket.emit("sendMessage", newMessage);
      setMessage("");
      setError("");
    } else {
      setError("Please select a user and type a message.");
    }
  };

  const filteredMessages = messages.filter(
    (msg) =>
      (msg.sender === currentUserId && msg.receiver === receiverId) ||
      (msg.receiver === currentUserId && msg.sender === receiverId)
  );

  return (
    <div className={styles.messageContainer}>
      <h2 className={styles.title}>Chat Application</h2>
      <select
        value={receiverId}
        onChange={(e) => {
          setReceiverId(e.target.value);
          setMessage("");
        }}
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
        {!loading && !error && filteredMessages.length === 0 && (
          <div>No messages to display.</div>
        )}
        {filteredMessages.map((msg, index) => (
          <div key={index} className={styles.message}>
            <strong>
              {msg.sender === currentUserId
                ? "You"
                : users.find((user) => user.id === msg.sender)?.email}
              :
            </strong>
            {msg.content}
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
      <div className={styles.truckAnimation}>
        <img src={truckImage} alt="Truck" className={styles.truckImage} />
      </div>
      <Link to="/User" className="home-link">
        Home
      </Link>
    </div>
  );
};

export default MessageUser;
