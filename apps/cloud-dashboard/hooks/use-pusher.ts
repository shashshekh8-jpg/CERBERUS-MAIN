import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

let pusherClient: Pusher | null = null;

export const usePusher = (channelName: string, eventName: string) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!pusherClient) {
      pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY || '7e21a4ce1acbb42bd97d', { 
        cluster: 'ap2' 
      });
    }
    const channel = pusherClient.subscribe(channelName);
    channel.bind(eventName, (payload: any) => setData(payload));
    
    return () => { channel.unbind(eventName); };
  }, [channelName, eventName]);

  return data;
};