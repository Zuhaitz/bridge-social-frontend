import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likeComment, reset } from "../../redux/comments/commentsSlice";

import userIcon from "../../assets/icons/circle-user.svg";
import likeIcon from "../../assets/icons/thumbs-up.svg";
import likeFillIcon from "../../assets/icons/thumbs-up-fill.svg";

import "./Comment.scss";

const Comment = ({ _id, content, picture, createdBy, likes }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { commentLiked } = useSelector((state) => state.comments);

  const isLiked = user ? likes.includes(user._id) : false;
  const [liked, setLiked] = useState(isLiked);
  const [listLikes, setListLikes] = useState(likes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (commentLiked !== _id) return;

    if (!liked) {
      setListLikes([...listLikes, user._id]);
    } else {
      const copy = new Set(listLikes);
      copy.delete(user._id);
      setListLikes([...copy]);
    }

    !liked ? setLiked(true) : setLiked(false);

    dispatch(reset());
  }, [commentLiked]);

  const onLike = (event) => {
    event.preventDefault();
    if (!user) return;

    dispatch(likeComment({ id: _id, isLiked: !liked }));
  };

  const goToProfile = (event) => {
    event.preventDefault();
    navigate(`/profile/${createdBy._id}`);
  };

  return (
    <div>
      <div className="comment">
        <div>
          <div onClick={goToProfile} className="comment__picture">
            <img
              src={createdBy.picture || userIcon}
              alt="user profile picture"
            />
          </div>
        </div>

        <div className="comment__container">
          <div className="comment__body">
            <p className="comment__user">{createdBy.username}</p>
            <p className="comment__content">{content}</p>
          </div>

          <div onClick={onLike} className="comment__button">
            <img src={liked ? likeFillIcon : likeIcon} alt="like icon" />
            {listLikes.length > 0 && <p>{listLikes.length}</p>}
          </div>
        </div>
      </div>

      {picture && (
        <div className="comment__post-picture">
          <img src={picture} alt="comment picture" />
        </div>
      )}
    </div>
  );
};

export default Comment;
