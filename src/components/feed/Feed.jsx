import React from "react";
import Post from "../post/Post";
import Comment from "../comment/Comment";

const Feed = ({ posts, comments }) => {
  return (
    <div>
      {posts && posts.map((post) => <Post key={post._id} {...post} />)}

      {comments &&
        comments.map((comment) => <Comment key={comment._id} {...comment} />)}
    </div>
  );
};

export default Feed;
