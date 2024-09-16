import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import userIcon from "../../assets/icons/circle-user.svg";

import "./PostForm.scss";
import { createPost, reset } from "../../redux/posts/postsSlice";

const PostForm = ({ setPosting }) => {
  // const { user } = useSelector((state) => state.auth);
  const user = localStorage.getItem("user");

  const limit = 300;
  const [remaining, setRemaining] = useState(limit);
  const [post, setPost] = useState("");
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => state.posts);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      setPost("");
      setPosting(false);
    }
  }, [isSuccess]);

  const handleTextInput = (event) => {
    event.preventDefault();

    const { value, style, scrollHeight } = event.target;

    setPost(value);
    setRemaining(limit - value.length);
    // style.height = "144px";
    // style.height = scrollHeight + "px";
    // console.log(scrollHeight);
  };

  const handleCancel = (event) => {
    event.preventDefault();

    setPost("");
    setPosting(false);
  };

  const handlePublish = (event) => {
    event.preventDefault();

    dispatch(createPost({ content: post }));
  };

  return (
    <div className="form-post">
      <div className="form-post__buttons">
        <button onClick={handleCancel} className="form-post__cancel">
          Cancel
        </button>
        <button onClick={handlePublish} className="form-post__publish">
          Publish
        </button>
      </div>

      <div className="form-post__form">
        <div className="form-post__picture">
          <img src={user.picture || userIcon} alt="user profile picture" />
        </div>

        <textarea
          autoFocus
          name="post"
          id="post"
          placeholder="What's new?"
          value={post}
          onInput={handleTextInput}
          className="form-post__textarea"
        />
      </div>

      <div className="form-post__bottom">
        <div>Buttons</div>
        <div className={`${remaining < 0 && "error"}`}>{remaining}</div>
      </div>
    </div>
  );
};

export default PostForm;
