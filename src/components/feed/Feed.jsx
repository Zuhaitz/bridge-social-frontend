import React from "react";
import Post from "../post/Post";

const Feed = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} {...post} />
      ))}
    </div>
  );
};

export default Feed;
