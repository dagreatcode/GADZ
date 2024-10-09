// videoSocket.js
const handleVideoSocket = (io, socket) => {
  console.log("New client connected for video:", socket.id);

  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected from video:", socket.id);
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from }) => {
    console.log(`${from} is calling ${userToCall}`);
    io.to(userToCall).emit("callUser", { signal: signalData, from });
  });

  socket.on("answerCall", (data) => {
    console.log(`Call answered by ${data.to}`);
    io.to(data.to).emit("callAccepted", data.signal);
  });

  socket.on("sendSignal", ({ signal, to }) => {
    socket.to(to).emit("receiveSignal", { signal, from: socket.id });
  });

  socket.on("leaveRoom", (userId) => {
    console.log(`${userId} left the room`);
    socket.leave(userId);
  });
};

module.exports = handleVideoSocket;
