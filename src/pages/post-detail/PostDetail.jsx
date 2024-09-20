import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getById, likePost, reset } from "../../redux/posts/postsSlice";

import backIcon from "../../assets/icons/angle-left.svg";
import userIcon from "../../assets/icons/circle-user.svg";
import commentIcon from "../../assets/icons/comment-alt-middle.svg";
import likeIcon from "../../assets/icons/thumbs-up.svg";
import likeFillIcon from "../../assets/icons/thumbs-up-fill.svg";

import "./PostDetail.scss";
import Feed from "../../components/feed/Feed";
import CommentForm from "../../components/comment-form/CommentForm";

const PostDetail = () => {
  const { id } = useParams();
  const { post, postLiked } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem("user"));

  const [liked, setLiked] = useState(0);
  const [listLikes, setListLikes] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(reset());
    dispatch(getById(id));
  }, []);

  useEffect(() => {
    if (!post) return;

    const isLiked = user ? post.likes.includes(user._id) : false;
    setLiked(isLiked);
    setListLikes(post.likes);
  }, [post]);

  useEffect(() => {
    if (postLiked !== id) return;

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

    dispatch(likePost({ id: id, like: !liked }));
  };

  const onGoBack = (event) => {
    event.preventDefault();
    navigate("/");
  };

  const goToProfile = (event) => {
    event.preventDefault();
    navigate(`/profile/${post.createdBy._id}`);
  };

  return (
    <div className="post-detail">
      {!post ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="post-detail__topbar">
            <div onClick={onGoBack} className="post-detail__icon">
              <img src={backIcon} alt="go back icon" />
            </div>
            <p>Post</p>
          </div>

          <div className="post-detail__post">
            <div className="post-detail__info">
              <div onClick={goToProfile} className="post-detail__picture">
                <img
                  src={post.createdBy.picture || userIcon}
                  alt="user profile picture"
                />
              </div>

              <div>
                <p className="post-detail__username">
                  {post.createdBy.username}
                </p>
                <p className="post-detail__mention">
                  @{post.createdBy.username.toLowerCase()}
                </p>
              </div>
            </div>
            <p className="post-detail__content">{post.content}</p>

            <div className="post-detail__buttons">
              <div className="post-detail__button">
                <img src={commentIcon} alt="comment icon" />
                {post.comments.length > 0 && <p>{post.comments.length}</p>}
              </div>

              <div onClick={onLike} className="post-detail__button">
                <img src={liked ? likeFillIcon : likeIcon} alt="like icon" />
                {listLikes.length > 0 && <p>{listLikes.length}</p>}
              </div>
            </div>
          </div>

          {user && <CommentForm postId={id} />}

          <Feed posts={post.comments} />
        </>
      )}
    </div>
  );
};

export default PostDetail;
