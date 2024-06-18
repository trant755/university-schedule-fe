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

export const getSchedule = async (params) => {
  addToken();
  try {
    const response = await axios.get(`${API_URL}/schedules`, {
      params: {
        populate: "teacher,subject,time_slot, group",
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching schedule data:", error);
    throw error;
  }
};

export const createSchedule = async (data) => {
  addToken();
  try {
    const response = await axios.post(`${API_URL}/schedules`, { data: data });
    return response.data;
  } catch (error) {
    console.error("Error creating schedule:", error);
    throw error;
  }
};

export const updateSchedule = async (id, data) => {
  addToken();
  try {
    const response = await axios.put(`${API_URL}/schedules/${id}`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating schedule:", error);
    throw error;
  }
};

export const deleteSchedule = async (id) => {
  addToken();
  try {
    const response = await axios.delete(`${API_URL}/schedules/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting schedule:", error);
    throw error;
  }
};

export const getTeachers = async () => {
  addToken();
  try {
    const response = await axios.get(`${API_URL}/teachers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching teacher data:", error);
    throw error;
  }
};

export const getTeacher = async (id) => {
  addToken();
  try {
    const response = await axios.get(`${API_URL}/teachers`, {
      params: {
        populate: "subjects",
      },
      where: {
        user: id,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching teacher data:", error);
    throw error;
  }
};

export const getStudent = async (id) => {
  addToken();
  try {
    const response = await axios.get(`${API_URL}/students`, {
      params: {
        populate: "group",
      },
      where: {
        user: id,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching student data:", error);
    throw error;
  }
};

export const getSubjects = async (param) => {
  addToken();
  try {
    const response = await axios.get(`${API_URL}/subjects`, {
      params: {
        ...param,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching subject data:", error);
    throw error;
  }
};

export const createSubject = async (data) => {
  addToken();
  try {
    const response = await axios.post(`${API_URL}/subjects`, { data: data });
    return response.data;
  } catch (error) {
    console.error("Error creating subject:", error);
    throw error;
  }
};

export const updateSubject = async (id, data) => {
  addToken();
  try {
    const response = await axios.put(`${API_URL}/subjects/${id}`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating subject:", error);
    throw error;
  }
};

export const deleteSubject = async (id) => {
  addToken();
  try {
    const response = await axios.delete(`${API_URL}/subjects/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting subject:", error);
    throw error;
  }
};

export const getGroups = async (param) => {
  try {
    const response = await axios.get(`${API_URL}/groups`, {
      params: {
        ...param,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching group data:", error);
    throw error;
  }
};

export const getStreams = async (param) => {
  try {
    const response = await axios.get(`${API_URL}/streams`, {
      params: {
        populate: "groups",
        ...param,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching stream data:", error);
    throw error;
  }
};

export const getTimeSlots = async (param) => {
  try {
    const response = await axios.get(`${API_URL}/time-slots`, {
      params: {
        ...param,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching time slot data:", error);
    throw error;
  }
};
