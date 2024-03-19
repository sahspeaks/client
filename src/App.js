import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./services/authService";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getMyProfile()
      .then((response) => {
        if (response) {
          dispatch(login(response.data));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-100">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default App;
