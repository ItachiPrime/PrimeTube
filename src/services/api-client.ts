import axios from 'axios';
import { RAPID_API_KEY, RAPID_API_HOST, RAPID_API_BASE_URL } from '../config/api';

export const rapidApiClient = axios.create({
  baseURL: RAPID_API_BASE_URL,
  headers: {
    'x-rapidapi-key': RAPID_API_KEY,
    'x-rapidapi-host': RAPID_API_HOST
  }
});