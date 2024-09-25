import { useState } from "react";

import cameraIcon from "../../assets/icons/camera.svg";

import "./ProfileForm.scss";

const ProfileForm = ({ setEditing, profile }) => {
  const [banner, setBanner] = useState(profile.banner);
  const [picture, setPicture] = useState(profile.picture);

  const updateBanner = async (event) => {
    if (event.target.files.length === 0) return;
    setBanner(URL.createObjectURL(event.target.files[0]));
  };

  const updatePicture = async (event) => {
    if (event.target.files.length === 0) return;
    setPicture(URL.createObjectURL(event.target.files[0]));
  };

  const onSaveChanges = (event) => {
    event.preventDefault();
  };

  const onCancel = (event) => {
    event.preventDefault();
    setEditing(false);
  };

  return (
    <div className="profile-form">
      <p className="profile-form__title">Edit my profile</p>

      <div className="profile-form__image">
        <label htmlFor="banner">
          <div className="profile-form__banner">
            {banner && <img src={banner} alt="user banner" />}
          </div>

          <div className="profile-form__icon">
            <img src={cameraIcon} alt="change banner icon" />
          </div>
        </label>

        <input
          id="banner"
          type="file"
          accept="image/png, image/jpeg"
          onInput={updateBanner}
          className="profile-form__file-input"
        />
      </div>

      <div className="profile-form__container">
        <label htmlFor="picture">
          <div className="profile-form__picture">
            <img src={picture || userIcon} alt="user profile picture" />
          </div>
        </label>

        <input
          id="picture"
          type="file"
          accept="image/png, image/jpeg"
          onInput={updatePicture}
          className="profile-form__file-input"
        />

        <div className="profile-form__buttons">
          <button onClick={onSaveChanges} className="profile-form__button">
            Save changes
          </button>
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
