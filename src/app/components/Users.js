import React, { useEffect } from "react";
import Spinner from "./Spinner";
import userStore from "../store/UserStore";
import { observer } from "mobx-react-lite";

const Users = observer(() => {
  const {users, getUsers, deleteUser} = userStore;

  useEffect(() => {
    getUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="users flex-center">
      <Spinner className="spinner-transparent"/>
      <div className="users-list">
        {users.map((user, id) => {
          return (
            <div className="users-child flex-center" key={id}>
              <div className="users-child-fields flex-center">
                <span>Created: {user.created}</span>
                <span>Username: {user.username}, </span>
                <span>Email: {user.email}, </span>
                <span>Gender: {user.gender}, </span>
                <span>Birthday: {user.birthday}, </span>
                <span>Role: {user.role}</span>
              </div>
              <div className="users-child-btn">
                <button onClick={(id) => deleteUser(user.id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
});

export default Users;
