import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getById, getPostsById, reset } from "../../redux/users/usersSlice";

import Feed from "../../components/feed/Feed";
import Overlay from "../../components/overlay/Overlay";
import ProfileForm from "../../components/profile-form/ProfileForm";

import backIcon from "../../assets/icons/angle-left.svg";
import userIcon from "../../assets/icons/circle-user.svg";
import menuIcon from "../../assets/icons/menu-dots.svg";

import "./Profile.scss";

const Profile = () => {
  const { id } = useParams();
  const { profile, posts } = useSelector((state) => state.users);
  const user = JSON.parse(localStorage.getItem("user"));

  const [editing, setEditing] = useState(false);
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

  useEffect(() => {
    editing
      ? document.body.setAttribute(
          "style",
          `position: fixed; left: 0; right: 0;`
        )
      : document.body.setAttribute("style", "");
  }, [editing]);

  const onGoBack = (event) => {
    event.preventDefault();
    navigate("/");
  };

  const onEditProfile = (event) => {
    event.preventDefault();
    setEditing(true);
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
              {profile.banner && <img src={profile.banner} alt="user banner" />}
            </div>

            <div className="profile__container">
              <div className="profile__picture">
                <img
                  src={profile.picture || userIcon}
                  alt="user profile picture"
                />
              </div>

              <div className="profile__buttons">
                {user && user._id === id && (
                  <button onClick={onEditProfile} className="profile__edit">
                    Edit profile
                  </button>
                )}

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

          {editing && (
            <>
              <Overlay />
              <ProfileForm setEditing={setEditing} profile={profile} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
