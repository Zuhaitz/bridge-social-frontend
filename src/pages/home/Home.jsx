import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll, reset } from "../../redux/posts/postsSlice";
import Feed from "../../components/feed/Feed";

import mainIcon from "../../assets/icons/flame.svg";

import "./Home.scss";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getAll());
    dispatch(reset());
  }, []);

  return (
    <div className="home">
      <div className="home__top">
        <img src={mainIcon} alt="page icon" />
      </div>
      {isLoading ? <p>Loading...</p> : <Feed posts={posts} />}
    </div>
  );
};

export default Home;
