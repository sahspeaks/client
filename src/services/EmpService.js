import axios from "axios";
export class EmpService {
  server;
  constructor() {
    this.server = "http://localhost:5000/api/v1";
  }

  async addEmployee(formData) {
    try {
      const response = await axios.post(
        `${this.server}/addemployee`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      //   console.log(response);
      return response;
    } catch (error) {
      console.log("Employee serive :: addEmployee :: error", error);
    }
  }
  async getEmployees() {
    try {
      const response = await axios.get(`${this.server}/employees`, {
        withCredentials: true,
      });
      //   console.log(response);
      return response;
    } catch (error) {
      console.log("Employee serive :: getEmployees :: error", error);
    }
  }
  async deleteEmployee(userId) {
    try {
      return await axios.delete(`${this.server}/employee/${userId}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.log("Employee serive :: deleteEmployee :: error", error);
    }
  }
  async getSingleEmployee(userId) {
    try {
      return await axios.get(`${this.server}/employee/${userId}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.log("Employee serive :: getSingleEmployee :: error", error);
    }
  }
  async updateEmployee(userId, formData) {
    try {
      const response = await axios.put(
        `${this.server}/employee/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      //   console.log(response);
      return response;
    } catch (error) {
      console.log("Employee serive :: updateEmployee :: error", error);
    }
  }
}

const empService = new EmpService();

export default empService;
