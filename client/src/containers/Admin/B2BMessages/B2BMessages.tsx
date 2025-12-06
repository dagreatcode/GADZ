// import React, { useEffect, useState } from "react";
// import axios from "axios";

// type Message = {
//   updatedAt: string;
//   createdAt: string;
//   sender: string;
//   receiver: string;
//   content: string;
// };

// const B2BMessages: React.FC = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   useEffect(() => {
//     axios
//       .get<Message[]>("/api/message/cheat")
//       .then((response) => {
//         setMessages(response.data);
//         setError(null);
//       })
//       .catch((error) => {
//         console.error("Error fetching messages:", error);
//         setError("Failed to fetch messages. Please try again later.");
//       });
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Admin Dashboard</h1>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <table style={{ width: "100%", borderCollapse: "collapse" }}>
//         <thead>
//           <tr>
//             <th style={{ border: "1px solid black", padding: "8px" }}>
//               Sender
//             </th>
//             <th style={{ border: "1px solid black", padding: "8px" }}>
//               Receiver
//             </th>
//             <th style={{ border: "1px solid black", padding: "8px" }}>
//               Content
//             </th>
//             <th style={{ border: "1px solid black", padding: "8px" }}>
//               Date & Time
//             </th>
//             <th style={{ border: "1px solid black", padding: "8px" }}>
//               Updated
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {messages.map((message, index) => (
//             <tr key={index}>
//               <td style={{ border: "1px solid black", padding: "8px" }}>
//                 {message.sender}
//               </td>
//               <td style={{ border: "1px solid black", padding: "8px" }}>
//                 {message.receiver}
//               </td>
//               <td style={{ border: "1px solid black", padding: "8px" }}>
//                 {message.content}
//               </td>
//               <td style={{ border: "1px solid black", padding: "8px" }}>
//                 {message.createdAt}
//               </td>
//               <td style={{ border: "1px solid black", padding: "8px" }}>
//                 {message.updatedAt}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default B2BMessages;

import React, { useEffect, useState } from "react";
import axios from "axios";

type Message = {
  updatedAt: string;
  createdAt: string;
  sender: string;
  receiver: string;
  content: string;
};

const B2BMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get<Message[]>("/api/message/cheat");
        setMessages(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to fetch messages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleString();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Admin Dashboard</h1>

      {/* Loading Indicator */}
      {loading && (
        <p style={{ fontWeight: "bold" }}>
          <span className="spinner-border spinner-border-sm"></span> Loading
          messages…
        </p>
      )}

      {/* Error Message */}
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

      {/* No Messages */}
      {!loading && !error && messages.length === 0 && (
        <p>No messages found.</p>
      )}

      {/* Message Table */}
      {!loading && messages.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th style={cellStyle}>Sender</th>
              <th style={cellStyle}>Receiver</th>
              <th style={cellStyle}>Content</th>
              <th style={cellStyle}>Created</th>
              <th style={cellStyle}>Updated</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, i) => (
              <tr key={i}>
                <td style={cellStyle}>{msg.sender}</td>
                <td style={cellStyle}>{msg.receiver}</td>
                <td style={cellStyle}>{msg.content}</td>
                <td style={cellStyle}>{formatDate(msg.createdAt)}</td>
                <td style={cellStyle}>{formatDate(msg.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const cellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  fontSize: "14px",
};

export default B2BMessages;
