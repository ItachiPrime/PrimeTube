import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddChannelProps {
  onAddChannel: (channelId: string, name: string) => void;
}

const AddChannel: React.FC<AddChannelProps> = ({ onAddChannel }) => {
  const [channelId, setChannelId] = useState('');
  const [channelName, setChannelName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (channelId && channelName) {
      onAddChannel(channelId, channelName);
      setChannelId('');
      setChannelName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 bg-white rounded-lg shadow">
      <input
        type="text"
        value={channelId}
        onChange={(e) => setChannelId(e.target.value)}
        placeholder="Channel ID"
        className="p-2 border rounded"
      />
      <input
        type="text"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        placeholder="Channel Name"
        className="p-2 border rounded"
      />
      <button
        type="submit"
        className="flex items-center justify-center gap-2 bg-red-600 text-white p-2 rounded hover:bg-red-700"
      >
        <Plus size={18} />
        Add Channel
      </button>
    </form>
  );
}

export default AddChannel;
