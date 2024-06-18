import React, { useEffect } from "react";
import Schedule from "../components/Schedule";
import { Typography, DatePicker } from "antd";
import { useState } from "react";
import { getStudent, getTeacher } from "../services/api";
import * as dayjs from "dayjs";

const today = dayjs();

const SchedulePage = () => {
  const [date, setDate] = useState(today);
  const [user, setUser] = useState({});
  const [userRoleDetails, setUserRoleDetails] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.role?.name === "Student") {
        const { data: student } = await getStudent(user.id);

        if (student) {
          setUserRoleDetails(student[0]);
        }
      }
      if (user?.role?.name === "Teacher") {
        const { data: teacher } = await getTeacher(user.id);

        if (teacher) {
          setUserRoleDetails(teacher[0]);
        }
      }
    };
    fetchData();
  }, [user]);

  const dataHandler = async (date, dateString) => {
    setDate(date);
  };

  const filters = {
    date: date.format("YYYY-MM-DD"),
  };

  if (user?.role?.name === "Student") {
    filters.group = userRoleDetails?.attributes?.group.data.id;
  }

  if (user?.role?.name === "Teacher") {
    filters.teacher = userRoleDetails?.id;
  }

  return (
    <div>
      <h1>Мій Розклад {user?.role?.name === "Teacher" && "Викладача"}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: "16px",
          gap: "16px",
          paddingLeft: "8px",
        }}
      >
        <Typography style={{ fontSize: "16px" }}>Дата:</Typography>
        <DatePicker onChange={dataHandler} value={date} />
      </div>
      <Schedule filters={filters} />
    </div>
  );
};

export default SchedulePage;
