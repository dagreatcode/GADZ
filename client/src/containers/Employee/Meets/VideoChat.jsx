import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect, useCallback } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";

const ServerPort = process.env.REACT_APP_SOCKET_IO_CLIENT_PORT;
const socket = io(`${ServerPort}`);

const VideoChat = () => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const myVideo = useRef();
  const connectionsRef = useRef({});
  const userVideoRefs = useRef({}); // Ref to hold user video elements

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
      joinRoom();
    });

    socket.on("userJoined", (userId) => {
      const peer = createPeer(userId, me, stream);
      connectionsRef.current[userId] = peer;
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
      // Clean up the user video reference
      if (userVideoRefs.current[userId]) {
        userVideoRefs.current[userId].srcObject = null;
        delete userVideoRefs.current[userId];
      }
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

    peer.on("stream", (userStream) => {
      if (!userVideoRefs.current[userId]) {
        userVideoRefs.current[userId] = document.createElement("video");
        userVideoRefs.current[userId].playsInline = true;
        userVideoRefs.current[userId].autoplay = true;
        userVideoRefs.current[userId].style.width = "300px";
        userVideoRefs.current[userId].style.border = "1px solid black";
        document
          .getElementById("videoContainer")
          .appendChild(userVideoRefs.current[userId]);
      }
      userVideoRefs.current[userId].srcObject = userStream;
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
    Object.values(userVideoRefs.current).forEach((video) => {
      video.srcObject = null; // Clean up user video references
    });
    userVideoRefs.current = {}; // Reset user video refs
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
      />
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
