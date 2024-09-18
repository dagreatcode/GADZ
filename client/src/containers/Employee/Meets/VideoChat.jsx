import { Link } from "react-router-dom";   
// src/VideoChat.js
// https://www.twilio.com/en-us/blog/video-chat-react-html
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';

const socket = io('http://localhost:3001'); // Replace with your server URL

const VideoChat = () => {
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState('');
  const [callEnded, setCallEnded] = useState(false);
  const [me, setMe] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      myVideo.current.srcObject = stream;
    });

    socket.on('me', (id) => {
      setMe(id);
    });

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setReceivingCall(true);
      setCaller(from);
      setCallerSignal(signal);
    });
  }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me });
    });

    peer.on('stream', (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: caller });
    });

    peer.on('stream', (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <div>
      <div>
        <video playsInline muted ref={myVideo} autoPlay style={{ width: '300px' }} />
        {callAccepted && !callEnded ? (
          <video playsInline ref={userVideo} autoPlay style={{ width: '300px' }} />
        ) : null}
      </div>
      <div>
        {receivingCall && !callAccepted ? (
          <div>
            <h1>{caller} is calling...</h1>
            <button onClick={answerCall}>Answer</button>
          </div>
        ) : (
          <div>
            <input
              type="text"
              value={idToCall}
              onChange={(e) => setIdToCall(e.target.value)}
              placeholder="ID to call"
            />
            <button onClick={() => callUser(idToCall)}>Call</button>
          </div>
        )}
      </div>
      <div>
        {callAccepted && !callEnded ? (
          <button onClick={leaveCall}>End Call</button>
        ) : null}
      </div>
      <Link to="/Employee">Home</Link>
    </div>
  );
};

export default VideoChat;