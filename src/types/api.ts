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