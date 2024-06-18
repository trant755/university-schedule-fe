import React from "react";
import { Typography, Button } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const AuthPage = () => {
  return (
    <div
      style={{
        padding: "50px",
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        margin: "0 auto",
      }}
    >
      <Title>Welcome to the University Schedule System</Title>
      <Paragraph>
        This system allows university teachers to manage and view their
        schedules. Please login or register to continue.
      </Paragraph>
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Button type="primary" style={{ width: "150px" }}>
          <Link to="/login">Login</Link>
        </Button>
        <Button
          style={{
            width: "150px",
          }}
        >
          <Link to="/register">Register</Link>
        </Button>
      </div>
    </div>
  );
};

export default AuthPage;
