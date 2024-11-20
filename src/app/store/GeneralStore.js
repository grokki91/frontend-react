import { makeAutoObservable } from "mobx";

class GeneralStore {
  token = "";
  messageError = "";
  messageSuccess = "";
  isLogin = false;
  isLoading = false;
  isSignUp = false;

  constructor() {
    makeAutoObservable(this);
    this.checkLogin();
  }

  setToken = (token) => {
    this.token = token;
    localStorage.setItem("token", token);
  }

  setMessageError = (messageError) => {
    this.messageError = messageError;
  }

  setMessageSuccesss = (messageSuccess) => {
    this.messageSuccess = messageSuccess;
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
