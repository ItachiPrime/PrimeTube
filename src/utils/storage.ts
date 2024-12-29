import { Channel } from '../types';

const CHANNELS_KEY = 'yourtube_channels';

export const getStoredChannels = (): Channel[] => {
  const stored = localStorage.getItem(CHANNELS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addChannel = (channel: Channel) => {
  const channels = getStoredChannels();
  if (!channels.some(c => c.id === channel.id)) {
    channels.push(channel);
    localStorage.setItem(CHANNELS_KEY, JSON.stringify(channels));
  }
};

export const removeChannel = (channelId: string) => {
  const channels = getStoredChannels();
  const filtered = channels.filter(c => c.id !== channelId);
  localStorage.setItem(CHANNELS_KEY, JSON.stringify(filtered));
};