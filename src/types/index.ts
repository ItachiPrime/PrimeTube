export interface Video {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    channelTitle: string;
    publishedAt: string;
  };
}

export interface Channel {
  id: string;
  name: string;
}

export interface RapidApiVideoResponse {
  data: {
    videoId: string;
    title: string;
    description: string;
    thumbnail: Array<{ url: string }>;
    channelTitle: string;
    publishDate: string;
  }[];
}