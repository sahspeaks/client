import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import empService from "../services/EmpService";
import { useDispatch } from "react-redux";

export default function AddEmployee() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");
  const [course, setCourse] = useState("");
  const [image, setImage] = useState("");
  const [selectedValue, setSelectedValue] = useState("option1");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };

  const CourseOpt = ["MCA", "BCA", "BSC"];
  const DesignationOpt = ["HR", "Sales", "Manager"];

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("phone", phone);
    myForm.append("designation", designation);
    myForm.append("gender", selectedValue);
    myForm.append("course", course);
    myForm.append("avatar", image);

    try {
      const response = await empService.addEmployee(myForm).then((response) => {
        console.log(response);
        if (response.data.success) {
          navigate("/employees");
        } else {
          console.log("Invalid Details");
        }
      });
    } catch (error) {
      setError(error);
      console.error("Error:", error);
    }
  };

  return (
    <div className="grid font-body text-[#363A45] grid-cols-1 md:grid-cols-6 mx-auto">
      <div className="md:col-span-5 mt-20 md:mt-10 items-center justify-center mx-auto">
        <form onSubmit={submitHandler} className="flex flex-col p-6 md:p-16">
          <h1 className="text-3xl mb-8 md:text-left font-bold uppercase text-left">
            Add Employee
          </h1>
          <div className="flex flex-col space-y-8">
            <input
              className="py-3 bg-slate-200 px-4 font-body w-full"
              type="text"
              required
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter Name"
            />
            <input
              className="py-3 bg-slate-200 px-4 font-body w-full"
              type="email"
              required
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
            />
            <input
              className="py-3 bg-slate-200 px-4 font-body w-full"
              type="text"
              required
              id="phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              placeholder="Phone Number"
            />

            <select
              className="px-5 py-3 font-body bg-slate-200"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            >
              <option>Designations</option>
              {DesignationOpt.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              className="px-5 py-3 font-body bg-slate-200"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option>Courses</option>
              {CourseOpt.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <div className="flex flex-row items-center justify-around mt-4 border rounded-lg p-7">
              <div>
                <input
                  type="radio"
                  id="Male"
                  value="Male"
                  checked={selectedValue === "Male"}
                  onChange={() => handleRadioChange("Male")}
                />
                <label htmlFor="Male">Male</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="Female"
                  value="Female"
                  checked={selectedValue === "Female"}
                  onChange={() => handleRadioChange("Female")}
                />
                <label htmlFor="Female">Female</label>
              </div>
            </div>

            <input
              accept="image/*"
              required
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
            {image && (
              <img
                className="w-32 h-32 object-cover rounded-full"
                src={URL.createObjectURL(image)}
                alt="userImage"
              />
            )}
            <div className="bg-purple-600 hover:bg-purple-800 transition-all ease-in-out duration-200 rounded-md flex items-center justify-center py-3 w-full text-center h-[50px] text-white font-medium">
              <button type="submit">Add Employee</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
