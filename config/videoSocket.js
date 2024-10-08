// videoSocket.js
const handleVideoSocket = (io, socket) => {
  console.log("New client connected for video:", socket.id);

  // Emit user ID back to the client
  socket.emit("me", socket.id);

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected from video:", socket.id);
    socket.broadcast.emit("callEnded");
  });

  // Video call functionality
  socket.on("callUser", ({ userToCall, signalData, from }) => {
    console.log(`${from} is calling ${userToCall}`);
    io.to(userToCall).emit("callUser", { signal: signalData, from });
  });

  socket.on("answerCall", (data) => {
    console.log(`Call answered by ${data.to}`);
    io.to(data.to).emit("callAccepted", data.signal);
  });

  // Handle sending signals for video calls
  socket.on("sendSignal", ({ signal, to }) => {
    socket.to(to).emit("receiveSignal", { signal, from: socket.id });
  });

  // Handle user leaving the room
  socket.on("leaveRoom", (userId) => {
    console.log(`${userId} left the room`);
    socket.leave(userId);
  });
};

module.exports = handleVideoSocket;
