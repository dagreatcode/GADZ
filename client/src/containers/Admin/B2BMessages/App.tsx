import React from "react";
import { useMessages } from "../../ContextAPI/MessageContext";

const App: React.FC = () => {
  const { messages } = useMessages();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      {messages.length > 0 ? (
        <ul>
          {messages.map((message) => (
            <li key={message.id} style={{ marginBottom: "10px" }}>
              <strong>{message.sender}</strong> to{" "}
              <strong>{message.receiver}</strong>: {message.content}
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages to display.</p>
      )}
    </div>
  );
};

export default App;