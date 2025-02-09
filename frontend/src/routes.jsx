import React from "react";
import { Route, Routes } from "react-router-dom";
import LeaderboardPage from "./pages/LeaderboardPage";
import GroupDetailsPage from "./pages/GroupDetailsPage";
import LoginPage from "./pages/LoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LeaderboardPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/group/:id" element={<GroupDetailsPage />} />
    </Routes>
  );
};

export default AppRoutes;
