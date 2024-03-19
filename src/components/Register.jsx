import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData();
    formData.append("avatar", image);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await authService.signup(formData);
      if (response) {
        const userData = await authService.getMyProfile();
        if (userData) {
          dispatch(login(userData.data));
          navigate("/");
        }
      }
      setEmail("");
      setName("");
      setPassword("");
      setImage(null);
    } catch (error) {
      setError(error);
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full flex flex-col font-body justify-center items-center mx-auto h-[100vh]">
      <div className="mx-auto space-y-10">
        <h1 className="text-3xl md:text-left font-bold uppercase">Register</h1>
        {image && (
          <img
            className="w-32 h-32 object-cover rounded-full"
            src={URL.createObjectURL(image)}
            alt="userImage"
          />
        )}
        <form onSubmit={submitHandler} className="flex flex-col space-y-5">
          <input
            className="py-3 px-4 font-body bg-slate-200 w-full"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
          />
          <input
            className="py-3 px-4 font-body bg-slate-200 w-full"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <input
            className="py-3 bg-slate-200 w-full px-4 font-body"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <input
            type="file"
            required
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="bg-purple-600 hover:bg-purple-800 cursor-pointer transition-all ease-in-out duration-200 flex items-center rounded-md justify-center py-3 w-full text-center h-[50px] text-white font-medium">
            <button type="submit" className="w-full">
              Register
            </button>
          </div>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <p>
            Already Signed Up ?{" "}
            <Link to="/login">
              <button className="text-purple-600">Login here</button>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
