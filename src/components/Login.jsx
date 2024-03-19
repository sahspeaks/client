import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [role, setRole] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  let [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await authService.login({ email, password });
      if (response) {
        const userData = await authService.getMyProfile();
        console.log(userData.data.user);
        if (userData) dispatch(authLogin(userData.data));
        navigate("/");
      }
    } catch (error) {
      setError(error);
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="w-full font-body text-[#363A45] grid grid-cols-1 md:grid-cols-12 gap-24 md:gap-0 items-center">
        {/* Your existing UI code */}
        {/* ... */}
        <div className="mx-auto space-y-10 justify-center mb-20 md:mb-0 md:p-16 md:col-span-6">
          {/* Your existing UI code */}
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl font-extralight mb-2">Hello ,</h1>
            <h1 className="font-semibold text-3xl md:text-5xl">Edumindz</h1>
          </div>
          {/* Your existing form */}
          <form onSubmit={submitHandler} className="flex flex-col space-y-5">
            <input
              className="py-3 px-4 bg-gray-200 font-body font-medium"
              type="email"
              required
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="email"
            />
            <input
              className="py-3 bg-gray-200 px-4 font-body"
              type="password"
              required
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="password"
            />
            {/* Your existing buttons and links */}
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-800 transition-all rounded-md ease-in-out py-3 text-white font-medium"
            >
              Login
            </button>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <p>
              New User ?{" "}
              <Link to="/signup">
                <button className="text-purple-600 hover:text-purple-800 transition-all ease-in-out">
                  Register
                </button>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
