import React, { useEffect } from "react";
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Users from "./Users";
import NotFoundPage from "./NotFoundPage";
import Characters from "./Characters";
import AddCharacter from "./AddCharacter";
import img from '../../img/deadpool.svg';
import User from "./User";
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

  return (
    <>
      <nav className="nav flex-center">
        <ul className="nav-list flex-center">
          <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home page</NavLink></li>
          <li><NavLink to="/add" className={({ isActive }) =>(isActive ? " active" : "")}>Add character</NavLink></li>
          {getToken().role === "ROLE_ADMIN" && <li><NavLink to="/users" className={({ isActive }) =>(isActive ? " active" : "")}>Users</NavLink></li>}
          <li className="dropdown">
            <span><img src={img} alt="Account" stroke="white"/></span>
            <ul className="dropdown-content">
              <li><Link to="/user">Account Settings</Link></li>
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
