import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConnectWallet } from "../pages/ConectWallet";
import { Institution } from "../pages/Institution";
import { Employer } from "../pages/Employer";
import { FirstAccess } from "../pages/FirstAccess";
import { IssuedCertificate } from "../pages/IssuedCertificate";
import { Student } from "../pages/Student";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConnectWallet />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/connect-wallet" element={<ConnectWallet />} />
        <Route path="/first-access/:roleName" element={<FirstAccess />} />
        <Route path="/institution" element={<Institution />} />
        <Route path="/student" element={<Student />} />
        <Route path="/employer" element={<Employer />} />
        <Route path="issued-certificate/:documentHash" element={<IssuedCertificate />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
