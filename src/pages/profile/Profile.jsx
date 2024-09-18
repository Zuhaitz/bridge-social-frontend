import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getById } from "../../redux/users/usersSlice";

import backIcon from "../../assets/icons/angle-left.svg";

import "./Profile.scss";

const Profile = () => {
  const { id } = useParams();
  const { profile } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getById(id));
  }, []);

  return (
    <div className="profile">
      {!profile ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="profile__topbar">
            <img src={backIcon} alt="go back icon" className="profile__icon" />

            <div>
              <p className="profile__top-name">{profile.username}</p>
              <p className="profile__top-data">{profile.posts.length} posts</p>
            </div>
          </div>
          <div className="profile__card"></div>
        </>
      )}
    </div>
  );
};

export default Profile;
