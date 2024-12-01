import { makeAutoObservable } from "mobx";
import InputStore from "./InputStore";
import generalStore from "./GeneralStore";
import fetchWithAuth from "../utils/fetchWithAuth";
import messageStore from "./MessageStore";
import popupStore from "./PopupStore";

class UserStore {
  URL_LOGIN = "http://193.32.178.174:8080/login";
  URL_REGISTRATION = "http://193.32.178.174:8080/signup";
  URL_GET_USERS = "http://193.32.178.174:8080/api/users";
  URL_CHANGE_PASSWORD = "http://193.32.178.174:8080/api/users/change-password";
  users = [];
  currentUser = null;
  gender = "";

  inputStore = new InputStore({
    username: "",
    password: "",
    email: "",
    gender: "",
    birthday: "",
    newPassword: "",
    confirmPassword: ""
  })

  loginFields = ["username", "password"];
  registerFields = ["username", "email", "password", "gender", "birthday"];

  constructor() {
    makeAutoObservable(this);
  }

  setUsers(data) {
    this.users = data;
  }

  setCurrentUser = (currentUser) => {
    this.currentUser = currentUser;
  }

  setGender(gender) {
    this.gender = gender;
  }

  checkFields(fields){
    return fields.some((field) => {
      const value = this.inputStore.getValue(field);
      return value === null || value === "" || value === undefined;
    });
  };

  handleLogout = (navigate) => {
    localStorage.removeItem("token");
    generalStore.setLogin("");
    navigate("/");
    window.location.reload();
  };

  handleGenderChange = (e) => {
    const { value } = e.target;
    this.setGender(value);
    this.inputStore.handleChange({target: {name: 'gender', value}})
  }

  fetchAuth = async (url, fields) => {
    if (this.checkFields(fields)) {
      messageStore.setFormErrorMessage("There are empty fields");
      return;
    }

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.inputStore.state),
    };

    try {
      generalStore.setLoading(true);
      const response = await fetch(url, options);
      const result = await response.json();

      if (response.ok) {
        messageStore.setFormErrorMessage("");
        generalStore.setToken(result.token);
        generalStore.setLogin(true);
        this.inputStore.resetState();
        messageStore.setFormSuccessMessage(result.Message);
      } else {
        messageStore.setFormErrorMessage(result.Message);
      }
    } catch (error) {
      messageStore.setFormErrorMessage(error.toString());
    } finally {
      generalStore.setLoading(false);
    }
  }

  login = () => {
    this.fetchAuth(this.URL_LOGIN, this.loginFields);
  }

  registration = () => {
    this.fetchAuth(this.URL_REGISTRATION, this.registerFields);
  }

  getUsers = async () => {
    // if (this.users.length > 0) return;

    try {
      generalStore.setLoading(true);
      const response = await fetchWithAuth(this.URL_GET_USERS, {method: 'GET'}, generalStore.setLogin);
      this.setUsers(response);
    } catch (error) {
      messageStore.setGeneralErrorMessage(error.toString());
    } finally {
      generalStore.setLoading(false);
    }
  };

  deleteUser = async (id) => {
    try {
      const response = await fetchWithAuth(this.URL_GET_USERS + '/' + id, {method: 'DELETE'}, generalStore.setLogin);

      if (response.Status === "Success") {
        this.getUsers();
        popupStore.setToasterVisible(true);
        messageStore.setFormSuccessMessage(response.Message);
      }
    } catch (error) {
      messageStore.setGeneralErrorMessage(error.toString());
    }
  };

  getUser = async (id) => {
    try {
      generalStore.setLoading(true);
      const response = await fetchWithAuth(this.URL_GET_USERS + '/' + id, generalStore.setLogin);
      this.setCurrentUser(response);
      return this.currentUser;
    } catch (error) {
      messageStore.setGeneralErrorMessage(error.toString());
    } finally {
      generalStore.setLoading(false);
    }
  }

  updateUser = async (id, updatedField) => {
    const options = {
      method: "PATCH",
      body: JSON.stringify(updatedField)
    };

    const url = this.URL_GET_USERS + "/" + id;

    try {
      generalStore.setLoading(true);
      const response = await fetchWithAuth(url, options, this.setLogin);
      if (response.Status === "Success") {
        generalStore.setEditField(null);
        messageStore.setFormSuccessMessage(response.Message);
        popupStore.setToasterVisible(true);
      } 
    } catch (error) {
      messageStore.setFormErrorMessage(error.toString());
    } finally {
      generalStore.setLoading(false);
    }
  }

  changePassword = async (id) => {
    const body = {
      password: this.inputStore.getValue("password"),
      newPassword: this.inputStore.getValue("newPassword"),
      confirmPassword: this.inputStore.getValue("confirmPassword")
    }

    const options = {
      method: "POST",
      body: JSON.stringify(body)
    };

    if (!body.password || !body.newPassword || !body.confirmPassword) {
      messageStore.setFormErrorMessage("All password fields are required.");
      return;
    }

    if (body.newPassword !== body.confirmPassword) {
      messageStore.setFormErrorMessage("Passwords don't match");
      return;
    }

    const url = this.URL_CHANGE_PASSWORD + "/" + id;

    try {
      generalStore.setLoading(true);
      const response = await fetchWithAuth(url, options, this.setLogin);
      if (response.Status === "Success") {
        generalStore.setEditField(null);
        messageStore.setFormSuccessMessage(response.Message);
        popupStore.setToasterVisible(true);
      } 
    } catch (error) {
      messageStore.setFormErrorMessage(error.toString());
    } finally {
      generalStore.setLoading(false);
    }
  }

  fetchUser = async () => {
    const token = generalStore.getToken();
    const user = await this.getUser(token.id);

    if (user) {
      this.inputStore.setState("password", user.password);
      this.inputStore.setState("email", user.email);
      this.inputStore.setState("birthday", user.birthday);
    }
  }
}

const userStore = new UserStore();
export default userStore;
