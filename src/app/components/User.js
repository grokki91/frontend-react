import React, { useEffect, useState } from 'react';
import userStore from '../store/UserStore';
import { observer } from 'mobx-react-lite';
import { jwtDecode } from 'jwt-decode';
import generalStore from '../store/GeneralStore';
import Spinner from "./Spinner";
import messageStore from '../store/MessageStore';

const User = observer(() => {
  const { inputStore, getUser, updateUser, changePassword} = userStore;
  const { getValue, handleChange, setState } = inputStore;
  const {isLoading} = generalStore;
  const {formErrorMessage, formSuccessMessage} = messageStore;
  const [editField, setEditField] = useState(null);
  
  const token = localStorage.getItem("token");
  const userToken = jwtDecode(token);

  useEffect(() => {
    getUser(userToken.id).then((user) => {
      if (user) {
        setState("password", user.password);
        setState("email", user.email);
        setState("birthday", user.birthday);
      }
    });
  }, []);

  const handleSave = (field = "") => {
    const updatedField = { [field]: getValue(field) };

    try {
      if (field === "password") {
        changePassword(userToken.id);
        setEditField(null); 
        return;
      }

      updateUser(userToken.id, updatedField); 
      setEditField(null); 
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const renderPasswordFields = (fieldName) => {
    return (
      <div>
        <label htmlFor="password">
          <span>Password:</span>
          <input type="password" value={getValue(fieldName)} onChange={handleChange} name={fieldName} />
        </label>
        <label htmlFor="password">
          <span>New password:</span>
          <input type="password" value={getValue("newPassword")} onChange={handleChange} name="newPassword" />
          </label>
        <label htmlFor="password">
          <span>Confirm password:</span>
          <input type="password" value={getValue("confirmPassword")} onChange={handleChange} name="confirmPassword" />
        </label>
      </div>
    );
  }

  const renderField = (label, fieldName) => {
    const isEditing = editField === fieldName;

    return (
      <div className="character-field flex-center">
        {isEditing ? (
          <div className="user-edit">
            {
              fieldName === "password" ?
              renderPasswordFields(fieldName) :
              <>
                <input type="text" value={getValue(fieldName)} onChange={handleChange} name={fieldName} />
              </>
            }
            <div className="user-btn flex-center">
              <button onClick={() => handleSave(fieldName)}>Save</button>
              <button onClick={() => setEditField(null)}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <div className='user-view'>
              <div>{label.toUpperCase()}:</div>
              {
                fieldName !== "password" ?
                <div>{getValue(fieldName)}</div> :
                <></>
              }
            </div>
            <button onClick={() => setEditField(fieldName)}>Change</button>
          </>
        )}
      </div>
    );
  };

  return (
    <main className="flex-center">
      {
        isLoading ?
        <Spinner /> :
        <div className='flex-center user-wrapper'>
          {renderField("Password", "password")}
          {renderField("Email", "email")}
          {renderField("Birthday", "birthday")}
          <div className='message success'>{formSuccessMessage}</div>
          <div className='message'>{formErrorMessage}</div>
        </div>
      }
    </main>
  );
});

export default User;
