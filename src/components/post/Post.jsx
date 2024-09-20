import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likePost, reset } from "../../redux/posts/postsSlice";

import userIcon from "../../assets/icons/circle-user.svg";
import commentIcon from "../../assets/icons/comment-alt-middle.svg";
import likeIcon from "../../assets/icons/thumbs-up.svg";
import likeFillIcon from "../../assets/icons/thumbs-up-fill.svg";

import "./Post.scss";

const Post = ({ _id, content, createdBy, likes, comments, createdAt }) => {
  const { postLiked } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem("user"));

  const isLiked = user ? likes.includes(user._id) : false;
  const [liked, setLiked] = useState(isLiked);
  const [listLikes, setListLikes] = useState(likes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (postLiked !== _id) return;

    if (!liked) {
      setListLikes([...listLikes, user._id]);
    } else {
      const copy = new Set(listLikes);
      copy.delete(user._id);
      setListLikes([...copy]);
    }

    !liked ? setLiked(true) : setLiked(false);

    dispatch(reset());
  }, [postLiked]);

  const onLike = (event) => {
    event.preventDefault();
    if (!user) return;

    dispatch(likePost({ id: _id, like: !liked }));
  };

  const goToProfile = (event) => {
    event.preventDefault();
    navigate(`/profile/${createdBy._id}`);
  };

  return (
    <a href={`/post/${_id}`}>
      <div className="post">
        <div onClick={goToProfile} className="post__picture">
          <img src={createdBy.picture || userIcon} alt="user profile picture" />
        </div>
        <div className="post__body">
          <p className="post__user">{createdBy.username}</p>
          <p className="post__content">{content}</p>

          <div className="post__buttons">
            <div className="post__button">
              <img src={commentIcon} alt="comment icon" />
              {comments > 0 && <p>{comments}</p>}
            </div>

            <div onClick={onLike} className="post__button">
              <img src={liked ? likeFillIcon : likeIcon} alt="like icon" />
              {listLikes.length > 0 && <p>{listLikes.length}</p>}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Post;
