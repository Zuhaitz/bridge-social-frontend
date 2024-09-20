import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getById, reset } from "../../redux/posts/postsSlice";

import backIcon from "../../assets/icons/angle-left.svg";

import "./PostDetail.scss";

const PostDetail = () => {
  const { id } = useParams();
  const { post, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(reset());
    dispatch(getById(id));
  }, []);

  const onGoBack = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="post-detail">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="post-detail__topbar">
            <div onClick={onGoBack} className="post-detail__icon">
              <img src={backIcon} alt="go back icon" />
            </div>
          </div>

          <div className="post-detail__post"></div>
        </>
      )}
    </div>
  );
};

export default PostDetail;
