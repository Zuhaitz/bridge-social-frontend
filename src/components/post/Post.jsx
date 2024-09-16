import React from "react";

const Post = ({ _id, content, createdBy, likes, comments, createdAt }) => {
  return (
    <div>
      <p>{content}</p>
    </div>
  );
};

export default Post;
