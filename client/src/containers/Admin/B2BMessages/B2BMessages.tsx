import React, { useEffect, useState } from "react";
import axios from "axios";

type Message = {
  user: string;
  text: string;
};

const B2BMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    axios
      .get<Message[]>("/messages")
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
    //         <th>User</th>
    //         <th>Message</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {messages.map((message, index) => (
    //         <tr key={index}>
    //           <td>{message.user}</td>
    //           <td>{message.text}</td>
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
            <th style={{ border: "1px solid black", padding: "8px" }}>User</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Message</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid black", padding: "8px" }}>{message.user}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{message.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default B2BMessages;
