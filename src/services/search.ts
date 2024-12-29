import { rapidApiClient } from './api-client';
import { Video, RapidApiVideoResponse } from '../types';
import { transformVideoResponse } from '../utils/transform';

export const searchVideos = async (query: string): Promise<Video[]> => {
  try {
    const response = await rapidApiClient.get<RapidApiVideoResponse>('/search', {
      params: { query }
    });
    
    if (!response.data?.data) {
      console.warn('No search results found');
      return [];
    }

    return response.data.data.map(transformVideoResponse);
  } catch (error) {
    console.error('Error searching videos:', error);
    return [];
  }
};