import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const AdminPage = () => {
  return (
    <div style={{ padding: "50px" }}>
      <Title>Admin Panel</Title>
      <Paragraph>
        This is the admin panel. Here you can manage users, schedules, and other
        administrative tasks.
      </Paragraph>
    </div>
  );
};

export default AdminPage;
