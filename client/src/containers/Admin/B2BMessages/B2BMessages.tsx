import React, { useEffect, useState } from "react";
import axios from "axios";

type Message = {
  user: string;
  text: string;
};

const B2BMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    axios
      .get<Message[]>("/messages")
      .then((response) => setMessages(response.data))
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message, index) => (
            <tr key={index}>
              <td>{message.user}</td>
              <td>{message.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default B2BMessages;
