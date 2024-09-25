import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, uploadImages } from "../../redux/users/usersSlice";

import userIcon from "../../assets/icons/circle-user.svg";
import cameraIcon from "../../assets/icons/camera.svg";

import "./ProfileForm.scss";

const ProfileForm = ({ setEditing, profile }) => {
  const [banner, setBanner] = useState(profile.banner);
  const [picture, setPicture] = useState(profile.picture);
  const [files, setFiles] = useState({});

  const dispatch = useDispatch();
  const { isSuccess, isLoading } = useSelector((state) => state.users);

  useEffect(() => {
    if (!isSuccess) return;
    setEditing(false);
    dispatch(reset());
  }, [isSuccess]);

  const updateBanner = async (event) => {
    if (event.target.files.length === 0) return;
    const file = event.target.files[0];
    setBanner(URL.createObjectURL(file));
    setFiles({ ...files, banner: file });
  };

  const updatePicture = async (event) => {
    if (event.target.files.length === 0) return;
    const file = event.target.files[0];
    setPicture(URL.createObjectURL(file));
    setFiles({ ...files, picture: file });
  };

  const onSaveChanges = (event) => {
    event.preventDefault();
    if (Object.keys(files).length === 0) return;

    dispatch(uploadImages(files));
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
          <button
            onClick={onSaveChanges}
            className="profile-form__button"
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Save changes"}
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
