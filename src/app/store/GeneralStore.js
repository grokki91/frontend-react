import { makeAutoObservable } from "mobx";

class GeneralStore {
  token = "";
  isLogin = false;
  isLoading = false;
  isSignUp = false;
  isEditing = false;

  constructor() {
    makeAutoObservable(this);
    this.checkLogin();
  }

  setToken = (token) => {
    this.token = token;
    localStorage.setItem("token", token);
  }

  setLogin = (isLogin) => {
    this.isLogin = isLogin;
  }

  setLoading = (isLoading) => {
    this.isLoading = isLoading;
  }

  setSignUp = () => {
    this.isSignUp = !this.isSignUp;
  }

  setEditing = (isEditing) => {
    this.isEditing = isEditing;
  }

  checkLogin = () => {
    let tokenStorage = localStorage.getItem("token");

    if (tokenStorage) {
      this.setToken(tokenStorage);
      this.setLogin(true);
    }
  } 
}

const generalStore = new GeneralStore();
export default generalStore;
