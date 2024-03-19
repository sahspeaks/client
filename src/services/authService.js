import axios from "axios";
export class AuthService {
  server;
  constructor() {
    this.server = "http://localhost:5000/api/v1";
  }
  async login({ email, password }) {
    try {
      const response = await axios.post(
        `${this.server}/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      //   console.log(response);
      return response;
    } catch (error) {
      console.log("Auth serive :: login :: error", error);
    }
  }
  async signup(formData) {
    try {
      const response = await axios.post(`${this.server}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      //   console.log(response);
      return response;
    } catch (error) {
      console.log("Auth serive :: signup :: error", error);
    }
  }
  async logout() {
    try {
      const response = await axios.get(`${this.server}/logout`, {
        withCredentials: true,
      });
      //   console.log(response);
      //   return response;
    } catch (error) {
      console.log("Auth serive :: logout :: error", error);
    }
  }
  async getMyProfile() {
    try {
      const response = await axios.get(`${this.server}/me`, {
        withCredentials: true,
      });
      //   console.log(response);
      return response;
    } catch (error) {
      console.log("Auth serive :: getMyProfile :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
