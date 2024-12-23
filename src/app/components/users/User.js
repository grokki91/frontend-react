import React, { useEffect } from "react";
import userStore from "../../store/UserStore";
import { observer } from "mobx-react-lite";
import generalStore from "../../store/GeneralStore";
import Spinner from "../../elements/Spinner";
import messageStore from "../../store/MessageStore";
import Toaster from "../../elements/Toaster";
import Date from "../../elements/Date";
import dayjs from 'dayjs';

const User = observer(() => {
  const { inputStore, updateUser, changePassword, fetchUser } = userStore;
  const { getValue, handleChange, resetPasswordState } = inputStore;
  const { isLoading, getToken, editField, setEditField } = generalStore;
  const { formErrorMessage, formSuccessMessage, resetMessages } = messageStore;

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditCancel = () => {
    setEditField(null);
    resetMessages();
    resetPasswordState();
  };

  const handleEditChange = (field) => {
    setEditField(field);
    resetMessages();
    resetPasswordState();
  };

  const handleSave = (field = "") => {
    const updatedField = { [field]: getValue(field) };

    try {
      if (field === "password") {
        changePassword(getToken().id);
        return;
      }

      updateUser(getToken().id, updatedField);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const renderFields = () => {
    const fields = [
      { label: "Password", fieldName: "password"},
      { label: "Email", fieldName: "email" },
      { label: "Birthday", fieldName: "birthday" },
    ];

    return fields.map(({ label, fieldName }) => (
      <div className="form-field flex-center" key={fieldName}>
        {editField === fieldName ? (
          <div className="user-edit">
            {fieldName === "password" && <div>{renderPasswordFields()}</div>}

            {fieldName === "birthday" && <Date />}

            {(fieldName !== "birthday" && fieldName !== "password") && 
              <input type="text" value={getValue(fieldName)} onChange={handleChange} name={fieldName} />
            }

            <div className="user-btn flex-center">
              <button onClick={() => handleSave(fieldName)}>Save</button>
              <button onClick={handleEditCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <div className="user-view flex-center">
              <div className="user-view-field">{label.toUpperCase()}:</div>
              {fieldName !== "password" && fieldName !== "birthday" ? (
                <div className="user-view-value">{getValue(fieldName)}</div>
              ) : (
                <></>
              )}
              {fieldName === "birthday" && <div className="user-view-value">{dayjs(getValue(fieldName)).format('DD-MM-YYYY')}</div>}
            </div>
            <button onClick={() => handleEditChange(fieldName)}>&#9998;</button>
          </>
        )}
      </div>
    ));
  };

  const renderPasswordFields = () => {
    const fields = [
      { text: "Password", value: "password" },
      { text: "New password", value: "newPassword" },
      { text: "Confirm password", value: "confirmPassword" },
    ];

    return fields.map(({ text, value }) => (
      <label htmlFor={value} key={value}>
        <span>{text}:</span>
        <input
          type="password"
          value={getValue(value)}
          onChange={handleChange}
          name={value}
        />
      </label>
    ));
  };

  return (
    <main className="user flex-center">
      {formSuccessMessage && <Toaster />}
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex-center user-wrapper">
          <h2 className="username">User: {getToken().username}</h2>
          <div className="user-wrapper">
            {renderFields()}
            {editField && formSuccessMessage && (
              <div className="message success">{formSuccessMessage}</div>
            )}
            {editField && formErrorMessage && (
              <div className="message">{formErrorMessage}</div>
            )}
          </div>
        </div>
      )}
    </main>
  );
});

export default User;
