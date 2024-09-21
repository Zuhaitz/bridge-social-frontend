import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import userIcon from "../../assets/icons/circle-user.svg";

import "./CommentForm.scss";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../../redux/comments/commentsSlice";

const CommentForm = ({ postId }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const limit = 300;
  const [comment, setComment] = useState("");
  const [remaining, setRemaining] = useState(limit);
  const { comment: com, isSuccess } = useSelector((state) => state.comments);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTextInput = (event) => {
    event.preventDefault();

    const { value } = event.target;

    setComment(value);
    setRemaining(limit - value.length);
  };

  const goToProfile = (event) => {
    event.preventDefault();
    navigate(`/profile/${user._id}`);
  };

  const sendComment = (event) => {
    event.preventDefault();
    if (comment.replace(/\s/g, "").length <= 0) return;

    dispatch(postComment({ post: postId, content: comment }));
  };

  return (
    <>
      <div>
        <div className="comment-form">
          <div onClick={goToProfile} className="post-detail__picture">
            <img src={user.picture || userIcon} alt="user profile picture" />
          </div>

          <div className="comment-form__container">
            <textarea
              autoFocus
              name="post"
              id="post"
              placeholder="Write your response"
              rows={2}
              value={comment}
              onInput={handleTextInput}
              className="comment-form__textarea"
            />

            <div className="comment-form__options">
              <div>Buttons</div>

              <div className="comment-form__info">
                <p className={`${remaining < 0 && "error"}`}>{remaining}</p>
                <button onClick={sendComment} className="comment-form__respond">
                  Respond
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentForm;
