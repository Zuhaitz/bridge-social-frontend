import React from "react";
import { useParams } from "react-router-dom";

import "./Profile.scss";

const Profile = () => {
  const { id } = useParams();

  return <div>Profile {id}</div>;
};

export default Profile;
