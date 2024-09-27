import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  postComment,
  uploadImageToComment,
  reset,
} from "../../redux/comments/commentsSlice";

import userIcon from "../../assets/icons/circle-user.svg";
import pictureIcon from "../../assets/icons/picture.svg";

import "./CommentForm.scss";

const CommentForm = ({ postId }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const limit = 300;
  const [comment, setComment] = useState("");
  const [remaining, setRemaining] = useState(limit);
  const [picture, setPicture] = useState(null);
  const [file, setFile] = useState({});

  const {
    comment: com,
    isSuccess,
    isLoading,
    commentUploaded,
  } = useSelector((state) => state.comments);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!commentUploaded) return;
    dispatch(uploadImageToComment({ id: com._id, picture: file }));
  }, [commentUploaded]);

  useEffect(() => {
    if (!isSuccess) return;
    dispatch(reset());
    setComment("");
    setPicture(null);
    setFile({});
    setRemaining(limit);
  }, [isSuccess]);

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

  const addImage = async (event) => {
    if (event.target.files.length === 0) return;
    const file = event.target.files[0];
    setPicture(URL.createObjectURL(file));
    setFile({ picture: file });
  };

  const sendComment = (event) => {
    event.preventDefault();
    if (comment.replace(/\s/g, "").length <= 0 || comment.length > limit)
      return;

    dispatch(postComment({ post: postId, content: comment.trim() }));
  };

  const uploadImage = () => {};

  return (
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
          value={comment}
          onInput={handleTextInput}
          className="comment-form__textarea"
        />

        {picture && (
          <div className="comment-form__image">
            <img src={picture} alt="comment form image" />
          </div>
        )}

        <div className="comment-form__options">
          <div className="comment-form__buttons">
            <label htmlFor="picture">
              <div className="comment-form__button">
                <img src={pictureIcon} alt="change banner icon" />
              </div>
            </label>

            <input
              id="picture"
              type="file"
              accept="image/png, image/jpeg"
              onInput={addImage}
              className="comment-form__file-input"
            />
          </div>

          <div className="comment-form__info">
            <p className={`${remaining < 0 && "error"}`}>{remaining}</p>

            <button onClick={sendComment} className="comment-form__respond">
              Respond
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
