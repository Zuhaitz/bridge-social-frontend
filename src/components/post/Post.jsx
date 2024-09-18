import React, { useState } from "react";

import userIcon from "../../assets/icons/circle-user.svg";
import commentIcon from "../../assets/icons/comment-alt-middle.svg";
import likeIcon from "../../assets/icons/thumbs-up.svg";
import likeFillIcon from "../../assets/icons/thumbs-up-fill.svg";

import "./Post.scss";

const Post = ({ _id, content, createdBy, likes, comments, createdAt }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const isLiked = user ? likes.includes(user._id) : false;
  const [liked, setLiked] = useState(isLiked);
  const [listLikes, setListLikes] = useState(likes);

  const onLike = (event) => {
    event.preventDefault();

    !liked ? setLiked(true) : setLiked(false);
    setListLikes([...listLikes, "1"]);
    console.log(listLikes);
  };

  return (
    <div className="post">
      <div className="post__picture">
        <img src={createdBy.picture || userIcon} alt="user profile picture" />
      </div>
      <div className="post__body">
        <p className="post__user">{createdBy.username}</p>
        <p className="post__content">{content}</p>

        <div className="post__buttons">
          <div className="post__button">
            <img src={commentIcon} alt="comment icon" />
            {comments.length > 0 && <p>{comments.length}</p>}
          </div>

          <div onClick={onLike} className="post__button">
            <img src={liked ? likeFillIcon : likeIcon} alt="like icon" />
            {listLikes.length > 0 && <p>{listLikes.length}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
