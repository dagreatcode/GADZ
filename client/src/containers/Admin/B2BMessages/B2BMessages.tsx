import React, { useEffect, useState } from "react";
import axios from "axios";

type Message = {
  updatedAt: string;
  createdAt: string,
  sender: string;
  receiver: string;
  content: string;
};

const B2BMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    axios
      .get<Message[]>("/api/message/cheat")
      .then((response) => {
        setMessages(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setError("Failed to fetch messages. Please try again later.");
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get<Message[]>("/messages")
  //     .then((response) => setMessages(response.data))
  //     .catch((error) => console.error("Error fetching messages:", error));
  // }, []);

  return (
    // <div>
    //   <h1>Admin Dashboard</h1>
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>sender</th>
    //         <th>Message</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {messages.map((message, index) => (
    //         <tr key={index}>
    //           <td>{message.sender}</td>
    //           <td>{message.receiver}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Sender</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Receiver</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Content</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Date & Time</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Updated</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid black", padding: "8px" }}>{message.sender}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{message.receiver}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{message.content}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{message.createdAt}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{message.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default B2BMessages;
