import { makeAutoObservable } from "mobx";
import InputStore from "./InputStore";
import generalStore from "./GeneralStore";
import fetchWithAuth from "../utils/fetchWithAuth";

class UserStore {
  URL_LOGIN = "http://193.32.178.174:8080/login";
  URL_REGISTRATION = "http://193.32.178.174:8080/signup";
  URL_GET_USERS = "http://193.32.178.174:8080/api/users";
  
  users = [];
  gender = "";

  inputStore = new InputStore({
    username: "",
    password: "",
    email: "",
    gender: "",
    birthday: "",
  })

  loginFields = ["username", "password"];
  registerFields = ["username", "email", "password", "gender", "birthday"];

  constructor() {
    makeAutoObservable(this);
  }

  setUsers(data) {
    this.users = data;
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
      generalStore.setMessageError("There are empty fields");
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
        generalStore.setMessageError("");
        generalStore.setToken(result.token);
        localStorage.setItem("token", result.token);
        generalStore.setLogin(true);
        this.inputStore.resetState();
      } else {
        generalStore.setMessageError(result.Message);
      }
    } catch (error) {
      generalStore.setMessageError(error.toString());
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
    try {
      generalStore.setLoading(true);
      const response = await fetchWithAuth(this.URL_GET_USERS, {method: 'GET'}, generalStore.setLogin);
      this.setUsers(response);
    } catch (error) {
      generalStore.setMessageError(error.toString());
    } finally {
      generalStore.setLoading(false);
    }
  };

  deleteUser = async (id) => {
    try {
      await fetchWithAuth(this.URL_GET_USERS + '/' + id, {method: 'DELETE'}, generalStore.setLogin);
      await this.getUsers();
    } catch (error) {
      generalStore.setMessageError(error.toString());
    }
  };
}

const userStore = new UserStore();
export default userStore;
