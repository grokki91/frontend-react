import React, { useEffect } from "react";
import Spinner from "../../elements/Spinner";
import userStore from "../../store/UserStore";
import { observer } from "mobx-react-lite";
import Toaster from "../../elements/Toaster";

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
                <div className="field-label">
                  <div>Created:</div>
                  <div className="field-value">{user.created && user.created.slice(0,10)}</div>
                </div> 
                <div className="field-label">
                  <div>Username:</div>
                  <div className="field-value">{user.username}</div>
                </div> 
                <div className="field-label">
                  <div>Email:</div> 
                  <div className="field-value">{user.email}</div>
                </div> 
                <div className="field-label">
                  <div>Gender:</div>
                  <div className="field-value">{user.gender}</div>
                </div> 
                <div className="field-label">
                  <div>Birthday:</div>
                  <div className="field-value">{user.birthday}</div>
                </div> 
                <div className="field-label">
                  <div>Role:</div>
                  <div className="field-value">{user.role.slice(5)}</div>
                </div> 
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
