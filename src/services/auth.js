import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api";

const addToken = () => {
  const token = localStorage.getItem("jwt");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const login = async (identifier, password) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/local`, {
      identifier,
      password,
    });

    localStorage.setItem("jwt", data.jwt);

    const userPLuck = await getUserDetails(data.jwt);

    localStorage.setItem("user", JSON.stringify(userPLuck));

    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getUserDetails = async (token) => {
  try {
    const { data } = await axios.get(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        populate: "role, teacher, student",
      },
    });

    return data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const register = async (body) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/local/register`, body);

    localStorage.setItem("jwt", data.jwt);

    return data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

export const registerStudent = async (firstName, lastName, group) => {
  addToken();
  try {
    const response = await axios.post(`${API_URL}/students`, {
      firstName,
      lastName,
      group,
    });

    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};
