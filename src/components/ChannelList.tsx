import React from 'react';
import { Channel } from '../types';
import { Trash2 } from 'lucide-react';

interface ChannelListProps {
  channels: Channel[];
  onRemoveChannel: (channelId: string) => void; 
}

const ChannelList: React.FC<ChannelListProps> = ({ channels, onRemoveChannel }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold mb-2">Following Channels</h2>
      {channels.map((channel) => (
        <div key={channel.id} className="flex items-center justify-between p-2 bg-white rounded-lg shadow">
          <span>{channel.name}</span>
          <button
            onClick={() => onRemoveChannel(channel.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ChannelList;
