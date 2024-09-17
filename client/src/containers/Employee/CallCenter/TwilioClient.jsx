// TwilioClient.js
import { useEffect, useState } from 'react';
import { Device } from '@twilio/voice-sdk';

const useTwilioClient = () => {
  const [device, setDevice] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const response = await fetch('/token', { method: 'POST' });
      const data = await response.json();
      const newDevice = new Device(data.token);
      setDevice(newDevice);
    };

    fetchToken();
  }, []);

  return device;
};

export default useTwilioClient;