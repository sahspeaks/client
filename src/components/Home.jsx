import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Home = () => {
  const [user, setUser] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    authService.getMyProfile().then((response) => {
      if (response) {
        setUser(response.data);
      } else {
        navigate("/login");
      }
    });
  }, []);

  if (!user) return <div>No Users Found</div>;

  return (
    <div className="flex relative items-center justify-center font-body">
      <div className="flex flex-col space-y-10 md:text-left relative p-20">
        <div className="text-center">Welcome Admin Panel</div>
      </div>
    </div>
  );
};

export default Home;
