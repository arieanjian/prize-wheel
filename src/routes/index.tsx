import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// component
import Layout from "@/components/Layout/Layout";
// pages
import LandingPage from "@/pages/LandingPage";
import Workspace from "@/pages/Workspace";
import ErrorPage from "@/pages/ErrorPage";

const Routers: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 斜線導入 */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/404" element={<ErrorPage />} />
        </Route>
        {/* 未匹配 */}
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
