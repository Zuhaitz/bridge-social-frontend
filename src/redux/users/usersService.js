import axios from "axios";

const API_URL = "http://localhost:3000";

const getById = async (userId) => {
  const res = await axios.get(`${API_URL}/users/id/` + userId);
  return res.data;
};

const getPostsById = async (userId) => {
  const res = await axios.get(`${API_URL}/users/posts/` + userId);
  return res.data;
};

const usersService = {
  getById,
  getPostsById,
};

export default usersService;
