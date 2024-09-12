import React from "react";

const Admin = () => {
  const users = [
    { username: "ivan", email: "ivan@te.st", role: "user" },
    { username: "petr", email: "petr@te.st", role: "user" },
    { username: "alexandr", email: "alexandr@te.st", role: "admin" }
  ];


  const style = {
    container: {
        fontSize: '20px',
        marginTop: '50px',
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'center'
    }
  }

  return (
    <div>
      {users.map((user, id) => {
        return (
          <div key={id} style={style.container}>
            <div>username: {user.username},</div>
            <div>email: {user.email},</div>
            <div>role: {user.role}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Admin;
