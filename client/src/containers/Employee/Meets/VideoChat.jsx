import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect, useCallback } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import "./Meets.css"; // Importing the CSS file for styling

const ServerPort = process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";
const socket = io(ServerPort);

const VideoChat = () => {
  const [stream, setStream] = useState(null);
  const [users, setUsers] = useState({});
  const [me, setMe] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const myVideo = useRef();
  const connectionsRef = useRef({});
  
  // Initialize socket outside useEffect to prevent re-initialization
  const socketRef = useRef(socket);

  const joinRoom = useCallback(() => {
    if (me) {
      socketRef.current.emit("userJoined", me);
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

    socketRef.current.on("me", (id) => {
      setMe(id);
      joinRoom();
    });

    socketRef.current.on("userJoined", (userId) => {
      const peer = createPeer(userId, me, stream);
      connectionsRef.current[userId] = peer;
      setUsers((prev) => ({ ...prev, [userId]: userId }));
    });

    socketRef.current.on("receiveSignal", ({ signal, from }) => {
      const peer = connectionsRef.current[from];
      if (peer) {
        peer.signal(signal);
      }
    });

    socketRef.current.on("userLeft", (userId) => {
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      socketRef.current.disconnect();
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream, joinRoom, me]);

  const createPeer = (userId, callerId, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sendSignal", { signal, to: userId });
    });

    peer.on("stream", (stream) => {
      const userVideo = document.getElementById(userId);
      if (userVideo) {
        userVideo.srcObject = stream;
      }
    });

    return peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    for (const userId in connectionsRef.current) {
      connectionsRef.current[userId].destroy();
    }
    connectionsRef.current = {};
    socketRef.current.emit("leaveRoom", me);
    setUsers({});
  };

  return (
    <div className="video-chat-container">
      <h1 className="title">Video Chat Application</h1>
      <div className="video-section">
        <video playsInline muted ref={myVideo} autoPlay className="my-video" />
        <div id="videoContainer" className="video-grid">
          {Object.keys(users).map((userId) => (
            <video
              key={userId}
              id={userId}
              className="user-video"
              autoPlay
              playsInline
            />
          ))}
        </div>
      </div>
      <div className="controls">
        {!callEnded ? (
          <>
            <button className="button" onClick={joinRoom}>
              Join Room
            </button>
            <button className="button" onClick={leaveCall}>
              Leave Call
            </button>
          </>
        ) : (
          <h2>Call Ended</h2>
        )}
      </div>
      <Link to="/Employee" className="home-link">
        Home
      </Link>
    </div>
  );
};

export default VideoChat;
