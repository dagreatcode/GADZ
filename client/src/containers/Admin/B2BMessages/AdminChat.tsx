import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const URL = "http://localhost:3001";
const socket = io(URL); // Replace with your server URL

// const socket = io("http://localhost:3001", {
//   autoConnect: false
// }); // Replace with your server URL

// const socket = io(URL, {
//   autoConnect: false
// });

// const io = new Server({
//   cors: {
//     origin: "http://localhost:3000"
//   }
// });
//
// io.listen(4000);
interface Message {
  user: string;
  text: string;
}

const AdminChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  return (
    <>
      <div>B2BMessages</div>
      <h1>Message will show here when created.</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <Link to="/Admin">Home</Link>
    </>
  );
};

export default AdminChat;
