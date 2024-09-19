import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getById, getPostsById, reset } from "../../redux/users/usersSlice";

import Feed from "../../components/feed/Feed";

import backIcon from "../../assets/icons/angle-left.svg";
import menuIcon from "../../assets/icons/menu-dots.svg";
import banner from "../../assets/images/wonderlands-melee-build.png";

import "./Profile.scss";

const Profile = () => {
  const { id } = useParams();
  const { profile, posts } = useSelector((state) => state.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
    dispatch(getById(id));
  }, []);

  useEffect(() => {
    if (!profile) return;
    dispatch(getPostsById(id));
  }, [profile]);

  const onGoBack = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="profile">
      {!profile ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="profile__topbar">
            <div onClick={onGoBack} className="profile__icon">
              <img src={backIcon} alt="go back icon" />
            </div>

            <div>
              <p className="profile__top-name">{profile.username}</p>
              <p className="profile__top-data">{profile.posts} posts</p>
            </div>
          </div>

          <div>
            <div className="profile__banner">
              <img src={profile.banner || banner} alt="user banner" />
            </div>

            <div className="profile__container">
              <div className="profile__picture">
                <img
                  src={profile.picture || banner}
                  alt="user profile picture"
                />
              </div>

              <div className="profile__buttons">
                <button className="profile__edit">Edit profile</button>

                <button className="profile__menu">
                  <img src={menuIcon} alt="menu icon" />
                </button>
              </div>

              <div>
                <p className="profile__username">{profile.username}</p>

                <p className="profile__mention">
                  @{profile.username.toLowerCase()}
                </p>

                <div className="profile__metrics">
                  <p>
                    <span>{profile.followers}</span> followers
                  </p>
                  <p>
                    <span>{profile.follows}</span> follows
                  </p>
                  <p>
                    <span>{profile.posts}</span> posts
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="profile__sections"></div>
          {posts && <Feed posts={posts} />}
        </>
      )}
    </div>
  );
};

export default Profile;
