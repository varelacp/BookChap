import axios from 'axios';
const baseURL = `${import.meta.env.VITE_PROJECTS_API}/auth`;

export const signup = user => {
  return axios.post(`${baseURL}/signup`, user);
};

export const login = user => {
  return axios.post(`${baseURL}/login`, user);
};

export const signupGoogle = user => {
  return axios.post(`${baseURL}/signup-google`, user);
};
