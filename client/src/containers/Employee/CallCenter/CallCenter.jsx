import React, { useState } from 'react';
import { Link } from "react-router-dom";
// CallCenter.js
import useTwilioClient from './TwilioClient';

const CallCenter = () => {
  const device = useTwilioClient();
  const [callInProgress, setCallInProgress] = useState(false);

  const handleCall = () => {
    if (device) {
      device.connect();
      setCallInProgress(true);
    }
  };

  const handleHangup = () => {
    if (device) {
      device.disconnectAll();
      setCallInProgress(false);
    }
  };

  return (
    <div>
      <h1>Call Center</h1>
      <button onClick={handleCall} disabled={callInProgress}>Call</button>
      <button onClick={handleHangup} disabled={!callInProgress}>Hang Up</button>
      <Link to="/Employee">Home</Link>
    </div>
  );
};

export default CallCenter;
