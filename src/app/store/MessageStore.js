import { makeAutoObservable } from "mobx";

class MessageStore {
  generalErrorMessage = "";
  generalSuccessMessage = "";
  formErrorMessage = "";
  formSuccessMessage = "";

  constructor() {
    makeAutoObservable(this);
  }

  setGeneralErrorMessage = (generalErrorMessage) => {
    this.generalErrorMessage = generalErrorMessage;
  }

  setGeneralSuccessMessage = (generalSuccessMessage) => {
    this.generalSuccessMessage = generalSuccessMessage;
  }

  setFormErrorMessage = (formErrorMessage) => {
    this.formErrorMessage = formErrorMessage;
  }
  
  setFormSuccessMessage = (formSuccessMessage) => {
    this.formSuccessMessage = formSuccessMessage;
  };

  resetMessages = () => {
    this.setGeneralErrorMessage("");
    this.setGeneralSuccessMessage("");
    this.setFormErrorMessage("");
    this.setFormSuccessMessage("");
  }
}

const messageStore = new MessageStore();
export default messageStore;
