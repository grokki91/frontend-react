import { makeAutoObservable, observable } from "mobx";
import generalStore from "./GeneralStore";
import messageStore from "./MessageStore";

class InputStore {
  state = observable({});

  constructor(state = {}) {
    Object.assign(this.state, state);
    makeAutoObservable(this);
  }

  setState = (key, value) => {
    this.state[key] = value;
  }

  handleChange = (e) => {
    messageStore.setFormErrorMessage("");
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
    messageStore.setFormErrorMessage("");
  };
}


export default InputStore;
