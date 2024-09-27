import axios from "axios";

const API_URL = "http://localhost:3000";

const postComment = async (postId, commentData) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.post(
    `${API_URL}/comments/id/` + postId,
    commentData,
    {
      headers: {
        authorization: token,
      },
    }
  );

  return res.data;
};

const uploadImage = async (commentId, images) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const formData = new FormData();
  formData.append("picture", images.picture);

  const res = await axios.put(
    `${API_URL}/comments/uploadImage/${commentId}`,
    formData,
    {
      headers: {
        authorization: token,
      },
    }
  );

  return res.data;
};

const likeComment = async (commentId, isLiked = true) => {
  const token = JSON.parse(localStorage.getItem("token"));

  if (isLiked) {
    const res = await axios.put(
      `${API_URL}/comments/like/` + commentId,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );

    return res.data;
  }

  const res = await axios.delete(`${API_URL}/comments/like/` + commentId, {
    headers: {
      authorization: token,
    },
  });

  return res.data;
};

const commentsService = {
  postComment,
  uploadImage,
  likeComment,
};

export default commentsService;
