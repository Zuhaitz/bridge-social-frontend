import React, { useState } from "react";
import { useDispatch } from "react-redux";

import userIcon from "../../assets/icons/circle-user.svg";
import likeIcon from "../../assets/icons/thumbs-up.svg";
import likeFillIcon from "../../assets/icons/thumbs-up-fill.svg";

import "./Comment.scss";

const Comment = ({ _id, content, createdBy, likes }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  // const { postLiked } = useSelector((state) => state.comments);

  // const isLiked = user ? likes.includes(user._id) : false;
  const [liked, setLiked] = useState(false);
  const [listLikes, setListLikes] = useState(likes);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const onLike = (event) => {
    event.preventDefault();
    if (!user) return;

    // dispatch(likePost({ id: _id, like: !liked }));
  };

  const goToProfile = (event) => {
    event.preventDefault();
    navigate(`/profile/${createdBy._id}`);
  };

  return (
    <div className="comment">
      <div onClick={goToProfile} className="comment__picture">
        <img src={createdBy.picture || userIcon} alt="user profile picture" />
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
  );
};

export default Comment;
