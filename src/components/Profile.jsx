import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { login, logout } from "./store/authSlice";
// import authService from "./services/authService";

const Profile = () => {
  const user = useSelector((state) => state.auth.userData);
  console.log(user);
  // const dispatch = useDispatch();

  // const [userData, setUserData] = useState(null);
  // useEffect(() => {
  //   if (user) {
  //     setUserData(user);
  //   } else {
  //     authService.getMyProfile().then((response) => {
  //       if (response) {
  //         dispatch(login(response.data));
  //         setUserData(response.data);
  //       } else {
  //         dispatch(logout());
  //       }
  //     });
  //   }
  // }, [userData]);
  {
    if (!user) return <div>No user</div>;
    return (
      <div className="flex relative items-center justify-center font-body">
        <div className="flex flex-col space-y-10 md:text-left relative p-20">
          <div>
            <h1 className="uppercase text-3xl font-bold text-[#363A45]">
              Profile
            </h1>
          </div>
          <div className="flex flex-col space-y-7 md:flex-row md:items-center md:gap-16">
            {/* //image and change photo */}
            <div className="flex flex-col items-center gap-3">
              <img
                className="h-40 w-40 rounded-full"
                src={user.avatar?.url}
                alt="user-Image"
              />
            </div>
            <div className="flex flex-col gap-6 items-center md:items-start">
              {/* user details */}
              <div className="flex flex-col items-center md:items-start space-y-4">
                <div className="flex gap-3">
                  <h1 className="font-semibold text-[#363A45]">Name</h1>
                  <p>{user?.name}</p>
                </div>
                <div className="flex gap-3">
                  <h1 className="font-semibold text-[#363A45]">Email</h1>
                  <p>{user?.email}</p>
                </div>
                <div className="flex gap-3">
                  <h1 className="font-semibold text-[#363A45]">CreatedAt</h1>
                  <p>{user?.createdAt.split("T")[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
