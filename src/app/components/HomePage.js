import React, { useEffect } from "react";
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Users from "./users/Users";
import NotFoundPage from "./NotFoundPage";
import Characters from "./characters/Characters";
import AddCharacter from "./characters/AddCharacter";
import img from '../../img/deadpool.svg';
import User from "./users/User";
import { observer } from "mobx-react-lite";
import userStore from "../store/UserStore";
import messageStore from "../store/MessageStore";
import generalStore from "../store/GeneralStore";

const HomePage = observer(() => {
  const {handleLogout} = userStore;
  const {getToken} = generalStore;
  const {resetMessages} = messageStore;
  const navigate = useNavigate();

  useEffect(() => {
    resetMessages();
    checkRole();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkRole = () => {
    if (!getToken()) {
      handleLogout(navigate);
    }
  };

  const handleMenuClose = () => {
    const burgerToggle = document.getElementById("burger-toggle");
    if (burgerToggle) burgerToggle.checked = false;
  };

  return (
    <>
      <nav className="nav">
        <input id="burger-toggle" type="checkbox" />
        <label for="burger-toggle">
          <span></span>
        </label>
        
        <ul className="nav-list flex-center">
          <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} onClick={handleMenuClose} >Home page</NavLink></li>
          <li><NavLink to="/add" className={({ isActive }) =>(isActive ? " active" : "")} onClick={handleMenuClose} >Add character</NavLink></li>
          {
            getToken().role === "ROLE_ADMIN" &&
            <li><NavLink to="/users" className={({ isActive }) =>(isActive ? " active" : "")} onClick={handleMenuClose} >Users</NavLink></li>
          }
          <li className="dropdown">
            <span><img src={img} alt="Account" stroke="white"/></span>
            <ul className="dropdown-content">
              <li><NavLink to="/user" onClick={handleMenuClose}>Account Settings</NavLink></li>
              <li><button onClick={() => handleLogout(navigate)}>Log out</button></li>
            </ul>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Characters />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route
          path="/add"
          element={
            <AddCharacter />
          }
        ></Route>
        <Route path="/user" element={<User />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
});

export default HomePage;
