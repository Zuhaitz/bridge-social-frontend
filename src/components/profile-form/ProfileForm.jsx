import React from "react";

import "./ProfileForm.scss";

const ProfileForm = ({ setEditing, profile }) => {
  const onCancel = (event) => {
    event.preventDefault();
    setEditing(false);
  };

  return (
    <div className="profile-form">
      <p className="profile-form__title">Edit my profile</p>

      <div className="profile-form__banner">
        {profile.banner && <img src={profile.banner} alt="user banner" />}
      </div>

      <div className="profile-form__container">
        <div className="profile-form__picture">
          <img src={profile.picture || userIcon} alt="user profile picture" />
        </div>

        <div className="profile-form__buttons">
          <button className="profile-form__button">Save changes</button>
          <button
            onClick={onCancel}
            className="profile-form__button profile-form__button--cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
