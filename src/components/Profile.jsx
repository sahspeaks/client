import React, { useContext } from "react";
import UserContext from "../context/UserContext";

const Profile = () => {
  // Use useContext to access the UserContext
  const { user } = useContext(UserContext);

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        {/* Display user data */}
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        {/* Add more user data fields as needed */}
      </div>
    </div>
  );
};

export default Profile;
