import React, { useEffect, useState } from "react";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { RiAddCircleFill } from "react-icons/ri";
import empService from "../services/EmpService";

export default function Employees() {
  //   console.log(isAuthenticated);
  const deleteUserHandler = (userId) => {
    empService.deleteEmployee(userId).then((response) => {
      // console.log(response);
      if (response.data.success) {
        console.log("Deleted");
      } else {
        console.log("Invalid Details");
      }
    });
  };
  const editHandler = (userId) => {};

  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const response = empService.getEmployees().then((response) => {
        // console.log(response.data.employee);
        if (response.data.succes) {
          setEmployees(response.data.employee);
        } else {
          console.log("Invalid Details");
        }
      });
    } catch (error) {
      setError(error);
      console.error("Error:", error);
    }
  }, [deleteUserHandler]);

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
              {employees &&
                employees.map((item) => (
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
      <td className="pb-4">{item._id}</td>
      <td className="pb-4">
        <img
          src={item.avatar.url}
          className=" ml-4 h-10 w-10 rounded-lg "
          alt=""
        />
      </td>
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
          <Link to={`/editemployee/${item._id}`}>
            <button className="w-[90px] bg-purple-600 hover:bg-purple-800 transition-all ease-in-out duration-200 text-white py-2 rounded-lg text-sm font-normal">
              Edit
            </button>
          </Link>

          <button
            onClick={() => deleteUserHandler(item._id)}
            className="w-[80px] text-purple-500 hover:text-purple-800 transition-all ease-in-out duration-200"
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
