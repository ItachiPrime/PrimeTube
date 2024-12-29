import React, { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import { fetchChannelVideos } from '../services/youtube';
import { Video, Channel } from '../types';
import { getStoredChannels } from '../utils/storage';

const Home = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      const channels = getStoredChannels();
      if (channels.length > 0) {
        const allVideos = await Promise.all(
          channels.map(channel => fetchChannelVideos(channel.id))
        );
        setVideos(allVideos.flat().sort((a, b) => 
          new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime()
        ));
      }
      setLoading(false);
    };

    loadVideos();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-8">Loading...</div>;
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No videos to show. Add some channels to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default Home;