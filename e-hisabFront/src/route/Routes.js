import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../pages/home/Home";
import StorePage from "../pages/storepage/StorePage";
import Member from "../pages/member/Member";
import Dashboard from "../pages/dashboard/Dashboard";
import Layout from "../components/UI/Layout";
import Header from "../components/Header/Header";
import getCurrentUserData from "../Utils/FetchCurrentUserData";
import SuccessPage from "../pages/success";
import FailurePage from "../pages/failure";

const Navigations = () => {
  const auth = useSelector((state) => state.auth);
  const userData = getCurrentUserData();

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Member />} />
        <Route
          path="/home"
          element={userData ? <Home /> : <Navigate to="/member" />}
        />
        <Route
          path="/"
          element={
            auth.isAuthenticated ? (
              auth.role === "admin" ? (
                <Navigate to="/dashboard" />
              ) : (
                <Layout>
                  <Home />
                </Layout>
              )
            ) : (
              <Navigate to="/member" />
            )
          }
        />
        <Route path="/member" element={<Member />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<FailurePage />} />
        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route path="/store" element={<StorePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {/* {userData && <Footer />} */}
    </Router>
  );
};

export default Navigations;
