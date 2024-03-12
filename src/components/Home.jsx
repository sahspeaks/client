import React, { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Home = () => {
  let navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // Set the user from local storage
      setUser(JSON.parse(storedUser));
      alert("User Logged in");
    } else {
      navigate("/login");
    }
  }, [setUser, navigate]);

  if (!user) return <div>No Users Found</div>;

  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
      {/* <Header /> */}
      <div className="w-full flex flex-col items-center justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
        <div className="text-center">Welcome Admin Panel</div>
      </div>
    </main>
  );
};

export default Home;
