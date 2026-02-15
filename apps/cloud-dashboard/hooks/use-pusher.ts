import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

// Global Singleton
let pusherClient: Pusher | null = null;

export const usePusher = (channelName: string, eventName: string) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Initialize once
    if (!pusherClient) {
      // HARDCODED NUCLEAR FIX: Direct values, no variables.
      pusherClient = new Pusher('7e21a4ce1acbb42bd97d', {
        cluster: 'ap2' 
      });
    }

    const channel = pusherClient.subscribe(channelName);
    const handler = (payload: any) => setData(payload);
    
    channel.bind(eventName, handler);

    return () => { 
      channel.unbind(eventName, handler);
      // Keep socket open for speed
      pusherClient?.unsubscribe(channelName);
    };
  }, [channelName, eventName]);

  return data;
};
