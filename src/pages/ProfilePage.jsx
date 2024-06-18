import React, { useEffect, useState } from "react";
import { Typography, Descriptions, message } from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const { Title } = Typography;

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          message.error("Not authenticated");
          return;
        }

        const decoded = jwtDecode(token);
        const userId = decoded.id;

        const userResponse = await axios.get(
          `http://localhost:1337/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(userResponse.data);

        const teacherResponse = await axios.get(
          `http://localhost:1337/teachers?user=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (teacherResponse.data.length > 0) {
          setTeacher(teacherResponse.data[0]);
        } else {
          message.warning("No associated teacher record found");
        }
      } catch (error) {
        message.error("Failed to fetch Page data");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "50px" }}>
      <Title>Profile</Title>
      {user && (
        <Descriptions title="User Info">
          <Descriptions.Item label="Username">
            {user.username}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        </Descriptions>
      )}
      {teacher && (
        <Descriptions title="Teacher Info" style={{ marginTop: "20px" }}>
          <Descriptions.Item label="First Name">
            {teacher.firstName}
          </Descriptions.Item>
          <Descriptions.Item label="Last Name">
            {teacher.lastName}
          </Descriptions.Item>
          <Descriptions.Item label="Department">
            {teacher.department}
          </Descriptions.Item>
        </Descriptions>
      )}
    </div>
  );
};

export default ProfilePage;
