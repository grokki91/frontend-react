import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Users from "./Users";
import NotFoundPage from "./NotFoundPage";
import Films from "./Films";
import { jwtDecode } from "jwt-decode";
import AddFilm from "./AddFilm";

const HomePage = ({ setLogin }) => {
  const [userInfo, setUserInfo] = useState("");
  const navigate = useNavigate("");

  useEffect(() => {
    checkRole();
  }, []);

  const checkRole = () => {
    let token = localStorage.getItem("token");
    const decodeToken = jwtDecode(token);
    setUserInfo(decodeToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogin("");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <nav>
        <Link to="/">Home page</Link>
        <Link to="/film/add">Add film</Link>
        {userInfo.role === "ROLE_ADMIN" && <Link to="/users">Users</Link>}
        <button onClick={handleLogout}>Log out ({userInfo.email})</button>
      </nav>
      <Routes>
        <Route path="/" element={<Films setLogin={setLogin} />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/film/add" element={<AddFilm />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
};

export default HomePage;
