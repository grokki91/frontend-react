import React, { useEffect, useState } from "react";
import fetchWithAuth from "../utils/fetchWithAuth";

const Users = ({setLogin}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const URL_GET_USERS = "http://193.32.178.174:8080/api/users";

  const fetchUsers = async () => {
    try {
      const users = await fetchWithAuth(URL_GET_USERS, {method: 'GET'}, setLogin);
      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      {users.map((user, id) => {
        return (
          <div className="users flex-center" key={id}>
            <div>username: {user.username},</div>
            <div>email: {user.email},</div>
            <div>role: {user.role}</div>
          </div>
        );
      })}
    </main>
  );
};

export default Users;
