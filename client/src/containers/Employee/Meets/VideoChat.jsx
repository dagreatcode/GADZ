import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect, useCallback } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";

const ServerPort = process.env.REACT_APP_SOCKET_IO_CLIENT_PORT;
const socket = io(`${ServerPort}`);

const VideoChat = () => {
  const [stream, setStream] = useState(null);
  const [users, setUsers] = useState({});
  const [me, setMe] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const myVideo = useRef();
  const connectionsRef = useRef({});

  const joinRoom = useCallback(() => {
    if (me) {
      socket.emit("joinRoom", { userId: me });
    }
  }, [me]);

  useEffect(() => {
    const initializeStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 } },
          audio: true,
        });
        setStream(mediaStream);
        myVideo.current.srcObject = mediaStream;
      } catch (err) {
        console.error("Unable to access media devices:", err);
      }
    };

    initializeStream();

    socket.on("me", (id) => {
      setMe(id);
      joinRoom(); // Automatically join the room once you have an ID
    });

    socket.on("userJoined", (userId) => {
      const peer = createPeer(userId, me, stream);
      connectionsRef.current[userId] = peer;
      setUsers((prev) => ({ ...prev, [userId]: userId }));
    });

    socket.on("receiveSignal", ({ signal, from }) => {
      const peer = connectionsRef.current[from];
      if (peer) {
        peer.signal(signal);
      }
    });

    socket.on("userLeft", (userId) => {
      if (connectionsRef.current[userId]) {
        connectionsRef.current[userId].destroy();
        delete connectionsRef.current[userId];
      }
      setUsers((prev) => {
        const newUsers = { ...prev };
        delete newUsers[userId];
        return newUsers;
      });
    });

    return () => {
      socket.disconnect();
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream, joinRoom, me]);

  useEffect(() => {
    if (me) {
      joinRoom();
    }
  }, [me, joinRoom]);

  const createPeer = (userId, callerId, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("sendSignal", { signal, to: userId });
    });

    peer.on("stream", (stream) => {
      const userVideo = document.createElement("video");
      userVideo.playsInline = true;
      userVideo.autoplay = true;
      userVideo.srcObject = stream;
      userVideo.style.width = "300px"; // Set style for user video
      userVideo.style.border = "1px solid black";
      document.getElementById("videoContainer").appendChild(userVideo);
    });

    return peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    for (const userId in connectionsRef.current) {
      connectionsRef.current[userId].destroy();
    }
    connectionsRef.current = {};
    socket.emit("leaveRoom", { userId: me });
    setUsers({}); // Clear users from the state
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <video
          playsInline
          muted
          ref={myVideo}
          autoPlay
          style={{ width: "300px", border: "1px solid black" }}
        />
      </div>
      <div
        id="videoContainer"
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {Object.keys(users).map((userId) => (
          <div key={userId} style={{ margin: "10px" }}>
            <h3>User: {userId}</h3>
          </div>
        ))}
      </div>
      {!callEnded ? (
        <>
          <button onClick={joinRoom}>Join Room</button>
          <button onClick={leaveCall}>Leave Call</button>
        </>
      ) : (
        <h2>Call Ended</h2>
      )}
      <Link to="/Employee">Home</Link>
    </div>
  );
};

export default VideoChat;
