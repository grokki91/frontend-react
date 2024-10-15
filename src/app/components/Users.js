import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const URL_GET_USERS = "http://193.32.178.174:8080/api/users";
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    const options = {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    };

    try {
      const response = await fetch(URL_GET_USERS, options);
      const json = await response.json();
      setUsers(json);
    } catch (error) {
      console.log(error);
    }
  };

  const style = {
    container: {
      fontSize: "20px",
      marginTop: "50px",
      marginBottom: "10px",
      display: "flex",
      justifyContent: "center",
    },
  };

  return (
    <main>
      {}
      {users.map((user, id) => {
        return (
          <div key={id} style={style.container}>
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
