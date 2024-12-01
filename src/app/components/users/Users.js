import React, { useEffect } from "react";
import Spinner from "../Spinner";
import userStore from "../../store/UserStore";
import { observer } from "mobx-react-lite";
import Toaster from "../Toaster";

const Users = observer(() => {
  const {users, getUsers, deleteUser} = userStore;

  useEffect(() => {
    getUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="users flex-center">
      <Toaster />
      <Spinner className="spinner-transparent"/>
      <div className="users-list flex-center">
        {users.map((user, id) => {
          return (
            <div className="users-child flex-center" key={id}>
              <div className="users-child-fields flex-center">
                <div className="field-label">Created: <span className="field-value">{user.created && user.created.slice(0,10)}</span></div> 
                <div className="field-label">Username: <span className="field-value">{user.username}</span></div> 
                <div className="field-label">Email: <span className="field-value">{user.email}</span></div> 
                <div className="field-label">Gender: <span className="field-value">{user.gender}</span></div> 
                <div className="field-label">Birthday: <span className="field-value">{user.birthday}</span></div> 
                <div className="field-label">Role: <span className="field-value">{user.role.slice(5)}</span></div> 
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
