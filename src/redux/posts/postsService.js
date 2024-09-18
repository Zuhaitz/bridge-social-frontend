import axios from "axios";

const API_URL = "http://localhost:3000";

const getAll = async () => {
  const res = await axios.get(`${API_URL}/posts`);
  return res.data;
};

const createPost = async (postData) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.post(`${API_URL}/posts`, postData, {
    headers: {
      authorization: token,
    },
  });

  return res.data;
};

const likePost = async (postId, isLiked = true) => {
  const token = JSON.parse(localStorage.getItem("token"));

  if (isLiked) {
    const res = await axios.put(
      `${API_URL}/posts/like/` + postId,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );

    return res.data;
  }

  const res = await axios.delete(`${API_URL}/posts/like/` + postId, {
    headers: {
      authorization: token,
    },
  });

  return res.data;
};

const postsService = {
  getAll,
  createPost,
  likePost,
};

export default postsService;
