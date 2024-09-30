import axios from "axios";

const env = import.meta.env;
const API_URL = env.VITE_API_URL || "http://localhost:3000";

const getById = async (userId) => {
  const res = await axios.get(`${API_URL}/users/id/` + userId);
  return res.data;
};

const getPostsById = async (userId) => {
  const res = await axios.get(`${API_URL}/users/posts/` + userId);
  return res.data;
};

const uploadImages = async (images) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const formData = new FormData();
  formData.append("banner", images.banner);
  formData.append("picture", images.picture);

  const res = await axios.post(`${API_URL}/users/images`, formData, {
    headers: {
      authorization: token,
    },
  });

  return res.data;
};

const usersService = {
  getById,
  getPostsById,
  uploadImages,
};

export default usersService;
