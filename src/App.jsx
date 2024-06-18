import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TeacherPage from "./pages/TeacherPage";
import ProfilePage from "./pages/ProfilePage";
import SchedulePage from "./pages/SchedulePage";
import SearchSchedulePage from "./pages/SearchSchedulePage";

import { PrivateRoute } from "./components/PrivateRoute";
import { SharedLayout } from "./components/SharedLayout";
import { getUserDetails } from "./services/auth";
import EditSchedulePage from "./pages/EditSchedulePage";
import EditSubjectsPage from "./pages/EditSubjectsPage";

(async () => {
  const token = localStorage.getItem("jwt");

  if (token) {
    try {
      const user = await getUserDetails(token);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    } catch (error) {
      console.error("Error getting user details:", error);
    }
  }
})();

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="/" element={<SharedLayout />}>
          <Route
            path="my-schedule"
            element={<PrivateRoute component={SchedulePage} />}
          />
          <Route
            path="search-schedule"
            element={<PrivateRoute component={SearchSchedulePage} />}
          />
          <Route
            path="edit-schedule"
            element={<PrivateRoute component={EditSchedulePage} />}
          />
          <Route
            path="edit-subjects"
            element={<PrivateRoute component={EditSubjectsPage} />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
