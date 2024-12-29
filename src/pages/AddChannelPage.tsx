import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddChannel from '../components/AddChannel';
import ChannelList from '../components/ChannelList';
import { getStoredChannels, addChannel, removeChannel } from '../utils/storage';
import { Channel } from '../types'; 

const AddChannelPage = () => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState<Channel[]>(getStoredChannels()); 

  const handleAddChannel = async (channelId: string, name: string) => {
    try {
      await addChannel({ id: channelId, name });
      setChannels([...channels, { id: channelId, name }]); 
      navigate('/');
    } catch (error) {
      console.error('Failed to add channel:', error);
      // Display an error message to the user
    }
  };

  const handleRemoveChannel = (channelId: string) => {
    removeChannel(channelId)
    const updatedChannels = channels.filter((channel) => channel.id !== channelId);
    setChannels(updatedChannels); 
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Channels</h1>
      <div className="space-y-6">
        <AddChannel onAddChannel={handleAddChannel} />
        <ChannelList channels={channels} onRemoveChannel={handleRemoveChannel} />
      </div>
    </div>
  );
};

export default AddChannelPage;