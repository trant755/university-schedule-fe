import React from "react";
import { Typography, Button } from "antd";

export const UserBar = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    setUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    window.location.reload();
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <Typography
        style={{
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        {user?.username}
      </Typography>
      <Button
        type="primary"
        style={{ marginRight: "10px" }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};
