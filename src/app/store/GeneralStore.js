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

  fetchAuthRequest = async (url, user) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };

    try {
      this.setLoading(true);
      const response = await fetch(url, options);
      const result = await response.json();

      if (response.ok) {
        this.setMessageError("");
        this.setToken(result.token);
        localStorage.setItem("token", result.token);
        this.setLogin(true);
      } else {
        this.setMessageError(result.MessageError);
      }
    } catch (error) {
      this.setMessageError(error.toString());
    } finally {
      this.setLoading(false);
    }
  };
}

const generalStore = new GeneralStore();
export default generalStore;
