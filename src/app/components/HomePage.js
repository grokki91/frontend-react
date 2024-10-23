import React, { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Users from "./Users";
import NotFoundPage from "./NotFoundPage";
import { jwtDecode } from "jwt-decode";
import Characters from "./Characters";
import AddCharacter from "./AddCharacter";
import img from '../../img/account.png';

const HomePage = ({ setLogin, onChange, message, setMessage, character, request, setCharacter, isLoading, setLoading, deleteCharacter }) => {
  const [userInfo, setUserInfo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkRole();
  }, []);

  const checkRole = () => {
    let token = localStorage.getItem("token");
    if (token) {
      try {
        const decodeToken = jwtDecode(token);
        setUserInfo(decodeToken);
      } catch (error) {
        console.error("Invalid token");
        handleLogout();
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogin("");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <nav className="nav flex-center">
        <ul className="nav-list flex-center">
          <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home page</NavLink></li>
          <li><NavLink to="/add" className={({ isActive }) =>(isActive ? " active" : "")}>Add character</NavLink></li>
          {userInfo.role === "ROLE_ADMIN" && <li><NavLink to="/users" className={({ isActive }) =>(isActive ? " active" : "")}>Users</NavLink></li>}
          <li className="dropdown">
            <span><img src={img} alt="Account" /></span>
            <ul className="dropdown-content">
              <li><Link to="/">{userInfo.email}</Link></li>
              <li><button onClick={handleLogout}>Log out</button></li>
            </ul>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Characters setLogin={setLogin} isLoading={isLoading} setLoading={setLoading} deleteCharacter={deleteCharacter}/>}></Route>
        <Route path="/users" element={<Users setLogin={setLogin} />}></Route>
        <Route
          path="/add"
          element={
            <AddCharacter
              onChange={onChange}
              character={character}
              message={message}
              setMessage={setMessage}
              request={request}
              setCharacter={setCharacter}
            />
          }
        ></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
};

export default HomePage;
