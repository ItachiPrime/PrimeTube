import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

interface AddChannelProps {
  userId: string; // Pass the logged-in user's ID
}

const AddChannel: React.FC<AddChannelProps> = ({ userId }) => {
  const [channelId, setChannelId] = useState('');
  const [channelName, setChannelName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddChannel = async () => {
    if (!channelId || !channelName) {
      alert('Please enter both channel ID and name.');
      return;
    }

    setIsAdding(true);

    try {
      await setDoc(doc(db, `users/${userId}/channels`, channelId), {
        name: channelName,
      });
      setChannelId('');
      setChannelName('');
    } catch (error) {
      console.error('Failed to add channel:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Add a Channel</h2>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Channel ID"
          value={channelId}
          onChange={(e) => setChannelId(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Channel Name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={handleAddChannel}
          className="p-2 bg-black text-white rounded hover:bg-gray-800"
          disabled={isAdding}
        >
          {isAdding ? 'Adding...' : 'Add Channel'}
        </button>
      </div>
    </div>
  );
};

export default AddChannel;
