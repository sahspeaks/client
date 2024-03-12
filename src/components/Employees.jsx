import React, { useEffect, useContext } from "react";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { RiAddCircleFill } from "react-icons/ri";

export default function Employees({ isAuthenticated }) {
  //   console.log(isAuthenticated);
  const { user, setUser } = useContext(UserContext);
  const deleteUserHandler = (userId) => {};
  const editHandler = (userId) => {};

  const users = [
    {
      id: 1,
      image: "image",
      name: "name",
      email: "email",
      phone: "phone",
      designation: "designation",
      course: "course",
      gender: "M",
      createdAt: "12-03-2024",
    },
    {
      id: 2,
      image: "image",
      name: "name",
      email: "email",
      phone: "phone",
      designation: "designation",
      course: "course",
    },
  ];
  const navigate = useNavigate();
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

  return (
    <div className="font-body text-[#363A45] h-[100vh] grid grid-cols-1 md:grid-cols-2 mx-auto">
      <div className="md:col-span-3 mt-20 p-3 md:p-10 ">
        <Link to={`/addemployee`}>
          <button
            className={` flex flex-row gap-3  p-4   bg-purple-600 hover:bg-purple-800 transition-all ease-in-out duration-200 text-white py-2 rounded-lg text-sm font-normal`}
          >
            <RiAddCircleFill size={20} />
            Add Employee
          </button>
        </Link>
        <h1 className="text-3xl md:text-left font-bold uppercase">All Users</h1>
        <div className="w-full md:w-full mt-10 overflow-x-auto">
          <table className="w-full ">
            <thead>
              <tr>
                <th className="text-left pr-[100px] pb-4">Unique Id </th>
                <th className="text-left pr-[100px] pb-4">Image</th>
                <th className="text-left pr-[100px] pb-4">Name</th>
                <th className="text-left pr-[100px] pb-4">Email</th>
                <th className="text-left pr-[100px] pb-4">Mobile no</th>
                <th className="text-left pr-[100px] pb-4">Designation</th>
                <th className="text-left pr-[100px] pb-4">Gender</th>
                <th className="text-left pr-[100px] pb-4">Course</th>
                <th className="text-left pr-[100px] pb-4">Create Date</th>
                <th className="text-left pl-[120px] pb-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {users &&
                users.map((item) => (
                  <Row
                    changeRoleHandler={editHandler}
                    deleteUserHandler={deleteUserHandler}
                    key={item._id}
                    item={item}
                    // loading={loading}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
function Row({ item, editHandler, deleteUserHandler }) {
  return (
    <tr className="p-3">
      <td className="pb-4">{item.id}</td>
      <td className="pb-4">{item.image}</td>
      <td className="pb-4">{item.name}</td>
      <td className="pb-4">{item.email}</td>
      <td className="pb-4">{item.phone}</td>
      <td className="pb-4">{item.designation}</td>
      <td className="pb-4">{item.gender}</td>
      <td className="pb-4">{item.course}</td>
      <td className="pb-4">{item.createdAt}</td>
      <td className="pb-4">{item.role}</td>
      <td className="pb-4">
        <div className="flex items-start gap-4">
          <button
            onClick={() => editHandler(item._id)}
            className="w-[90px] bg-purple-600 hover:bg-purple-800 transition-all ease-in-out duration-200 text-white py-2 rounded-lg text-sm font-normal"
          >
            Edit
          </button>

          <button
            className="w-[80px] text-purple-500 hover:text-purple-800 transition-all ease-in-out duration-200"
            onClick={() => deleteUserHandler(item._id)}
          >
            <RiDeleteBin7Fill
              className="bg-[#d7c5ff] hover:bg-gray-200 transition-all ease-in-out duration-200 p-2 rounded-md"
              size={40}
            />
          </button>
        </div>
      </td>
    </tr>
  );
}
