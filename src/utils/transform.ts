import { Video } from '../types';

export const transformVideoResponse = (item: any): Video => ({
  id: item.videoId,
  snippet: {
    title: item.title || '',
    description: item.description || '',
    thumbnails: {
      medium: {
        url: item.thumbnail?.[0]?.url || ''
      }
    },
    channelTitle: item.channelTitle || '',
    publishedAt: item.publishDate || new Date().toISOString()
  }
});