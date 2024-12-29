import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
  source?: 'search' | 'channel';
}

const VideoCard: React.FC<VideoCardProps> = ({ video, source = 'channel' }) => {
  // Create a unique key by combining source and video id
  const videoKey = `${source}-${video.id}`;
  
  return (
    <Link to={`/video/${video.id}`} className="flex flex-col gap-2 rounded-lg" key={videoKey}>
      <div className="relative aspect-video rounded-lg overflow-hidden ">
        <img
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold line-clamp-2 text-black">{video.snippet.title}</h3>
        <p className="text-sm text-black">{video.snippet.channelTitle}</p>
        <p className="text-sm text-black">
          {formatDistanceToNow(new Date(video.snippet.publishedAt), { addSuffix: true })}
        </p>
      </div>
    </Link>
  );
}

export default VideoCard;