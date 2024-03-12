import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Employees from "./components/Employees";
import AddEmployee from "./components/AddEmployee";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "./context/UserContext";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header";
import { ProtectedRoute } from "protected-route-react";

function App() {
  const { user, setUser } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(storedIsAuthenticated === "true");
    if (storedUser) {
      // Set the user from local storage
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  return (
    <>
      <Router>
        <div className="container">
          <Header isAuthenticated={isAuthenticated} user={user} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route
              path="/employees"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Employees isAuthenticated={isAuthenticated} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addemployee"
              element={
                <ProtectedRoute
                  adminRoute={true}
                  isAdmin={user && user.role === "admin"}
                  isAuthenticated={isAuthenticated}
                  redirect="/logout"
                >
                  <AddEmployee isAuthenticated={isAuthenticated} user={user} />
                </ProtectedRoute>
              }
            />
            {/* <Route path="/addemployee" element={<AddEmployee />} /> */}
            <Route path="/*" element={<h1>Not Found</h1>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
