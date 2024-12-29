import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { doc, deleteDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase.config'; // Ensure the Firebase config is correctly imported
import { Channel } from '../types';

interface ChannelListProps {
  userId: string; // Pass the logged-in user's ID
}

const ChannelList: React.FC<ChannelListProps> = ({ userId }) => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, `users/${userId}/channels`),
      (snapshot) => {
        const fetchedChannels: Channel[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setChannels(fetchedChannels);
        setIsLoading(false);
      },
      (error) => {
        console.error('Error fetching channels:', error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  const handleRemoveChannel = async (channelId: string) => {
    try {
      await deleteDoc(doc(db, `users/${userId}/channels`, channelId));
    } catch (error) {
      console.error('Failed to remove channel:', error);
    }
  };

  if (isLoading) {
    return <p className="text-gray-500 text-center">Loading channels...</p>;
  }

  if (channels.length === 0) {
    return <p className="text-gray-500 text-center">No channels added yet. Add a channel to get started!</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold mb-2">Following Channels</h2>
      {channels.map((channel) => (
        <div
          key={channel.id}
          className="flex items-center justify-between p-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <span>{channel.name}</span>
          <button
            onClick={() => handleRemoveChannel(channel.id)}
            className="text-red-500 hover:text-red-700 focus:outline-none"
            aria-label={`Remove ${channel.name}`}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ChannelList;
