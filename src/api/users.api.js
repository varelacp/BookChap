import axios from 'axios';
const baseURL = `${import.meta.env.VITE_PROJECTS_API}/api`;

export const getUserDashboard = () => {
  return axios.get(`${baseURL}/user-dashboard`);
};

export const getAdminDashboard = () => {
  return axios.get(`${baseURL}/admin-dashboard`);
};

export const updateUserProfile = ({
  name,
  address,
  phoneNumber,
  profileImage
}) => {
  return axios.put(`${baseURL}/user-dashboard-edit`, {
    name,
    address,
    phoneNumber,
    profileImage
  });
};

export const updateAdminProfile = ({
  name,
  address,
  phoneNumber,
  profileImage
}) => {
  return axios.put(`${baseURL}/admin-dashboard-edit`, {
    name,
    address,
    phoneNumber,
    profileImage
  });
};

export const verifyToken = () => {
  return axios.get(`${baseURL}/verify`);
};

export const uploadImage = file => {
  const formData = new FormData();
  formData.append('file', file);

  return axios.post(`${baseURL}/upload`, formData);
};
