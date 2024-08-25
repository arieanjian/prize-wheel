import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// pages
import Dashboard from "@/Pages/Dashboard";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 斜線導入 */}
        <Route path="/" element={<Dashboard name="Ariean" />} />
        <Route path="/dashboard" element={<Dashboard name="Ariean" />} />
        {/* 未匹配 */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
