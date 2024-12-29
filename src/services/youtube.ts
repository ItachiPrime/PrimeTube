import axios, { AxiosError } from 'axios';
import { RAPID_API_KEY, RAPID_API_HOST, RAPID_API_BASE_URL } from '../config/api';
import { Video, RapidApiVideoResponse } from '../types';

const rapidApiClient = axios.create({
  baseURL: RAPID_API_BASE_URL,
  headers: {
    'x-rapidapi-key': RAPID_API_KEY,
    'x-rapidapi-host': RAPID_API_HOST
  }
});

export const fetchChannelVideos = async (channelId: string): Promise<Video[]> => {
  try {
    const response = await rapidApiClient.get<RapidApiVideoResponse>('/channel/videos', {
      params: { 
        id: channelId,
        filter: 'videos_latest'
      }
    });
    
    if (!response.data?.data) {
      console.warn('No video data received from API');
      return [];
    }

    return response.data.data.map(item => ({
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
    }));
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Error fetching videos:', {
      status: axiosError.response?.status,
      message: axiosError.message,
      data: axiosError.response?.data
    });
    return [];
  }
};