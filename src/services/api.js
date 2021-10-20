import axios from "axios";

export const key = '24c320d4daa037d433f042b68423b118';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export default api;