import React, { useEffect, useState } from 'react';
import userStore from '../store/UserStore';
import { observer } from 'mobx-react-lite';
import { jwtDecode } from 'jwt-decode';

const User = observer(() => {
  const { inputStore, getUser, updateUser } = userStore;
  const { getValue, handleChange, setState } = inputStore;
  const [editField, setEditField] = useState(null);
  
  const token = localStorage.getItem("token");
  const userToken = jwtDecode(token);

  useEffect(() => {
    getUser(userToken.id).then((user) => {
      if (user) {
        setState("username", user.username);
        setState("email", user.email);
        setState("birthday", user.birthday);
      }
    });
  }, []);

  const handleSave = async (field) => {
    const updatedField = { [field]: getValue(field) };

    try {
      await updateUser(userToken.id, updatedField); 
      setEditField(null); 
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const renderField = (label, fieldName) => {
    const isEditing = editField === fieldName;

    return (
      <div className="character-field">
        <label>{label}:</label>
        {isEditing ? (
          <>
            <input
              type="text"
              value={getValue(fieldName)}
              onChange={handleChange}
              name={fieldName}
            />
            <button onClick={() => handleSave(fieldName)}>Save</button>
            <button onClick={() => setEditField(null)}>Cancel</button>
          </>
        ) : (
          <>
            <span>{getValue(fieldName)}</span>
            <button onClick={() => setEditField(fieldName)}>Edit</button>
          </>
        )}
      </div>
    );
  };

  return (
    <main className="flex-center">
      {renderField("Username", "username")}
      {renderField("Email", "email")}
      {renderField("Birthday", "birthday")}
    </main>
  );
});

export default User;
