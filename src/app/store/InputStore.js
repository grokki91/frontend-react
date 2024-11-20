import { makeAutoObservable } from "mobx";
import generalStore from "./GeneralStore";

class InputStore {
  state = {};

  constructor(state = {}) {
    this.state = state;
    makeAutoObservable(this);
  }

  setState = (key, value) => {
    this.state[key] = value;
  }

  handleChange = (e) => {
    generalStore.setMessageError("");
    const { name, value } = e.target;
    this.state[name] = value;
  };

  getValue = (name) => {
    return this.state[name] || "";
  };
  
  resetState = () => {
    for (let key in this.state) {
      this.state[key] = "";
    }
  }

  toggleAuth = () => {
    generalStore.setSignUp();
    this.resetState();
    generalStore.setMessageError("");
  };
}


export default InputStore;
