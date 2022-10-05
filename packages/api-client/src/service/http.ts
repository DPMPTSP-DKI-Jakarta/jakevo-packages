import axios, { AxiosInstance } from 'axios';

export const getAxiosInstance = (url: string): AxiosInstance => {
  const API = axios.create();
  API.defaults.baseURL = url;
  return API;
};
