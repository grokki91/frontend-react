import { makeAutoObservable } from "mobx";
import InputStore from "./InputStore";
import generalStore from "./GeneralStore";
import fetchWithAuth from "../utils/fetchWithAuth";

class CharacterStore {
  URL_CHARACTERS = 'http://193.32.178.174:8080/api/characters'
  URL_ADD = "http://193.32.178.174:8080/api/characters/add";
  URL_DELETE = "http://193.32.178.174:8080/api/characters/";
  characters = [];
  alignment = "good";

  inputStore = new InputStore({
    alias: "",
    fullname: "",
    alignment: "good",
    abilities: "",
    age: "",
    team: "",
  });

  fields = ["alias", "fullname", "alignment", "abilities", "age", "team"];

  constructor() {
    makeAutoObservable(this);
  }

  setCharacters(data) {
    this.characters = data;
  }

  setAlignment(alignment) {
    this.alignment = alignment;
  }

  resetCharacter = () => {
    this.inputStore.resetState();
  };

  checkFields = () => {
    return this.fields.some((field) => {
      const value = this.inputStore.getValue(field);
      return value === null || value === "" || value === undefined;
    });
  };

  handleAgeChange = (e) => {
    const { value } = e.target;
    const isNumber = /^\d+(\.\d+)?$/.test(value);

    if (isNumber || value === "") {
      generalStore.setMessageError("");
      this.inputStore.handleChange(e);
    } else {
      generalStore.setMessageError("Only numbers are allowed in the Age field");
    }
  };

  handleAlignmentChange = (e) => {
    const { name, value } = e.target;
    this.inputStore.setState(name, value);
    this.setAlignment(value);
  };

  getCharacters = async () => {
    try {
      const response = await fetchWithAuth(this.URL_CHARACTERS, {method: 'GET'}, generalStore.setLogin);
      this.setCharacters(response)
    } catch (error) {
      generalStore.setMessageError(error.toString())
    } 
  }

  addCharacter = async (showPopup, navigate) => {
    const options = {
      method: "POST",
      body: JSON.stringify(this.inputStore.state),
    };

    if (this.checkFields()) {
      generalStore.setMessageError("All fields must be filled in");
      return;
    }

    try {
      const response = await fetchWithAuth(this.URL_ADD, options, generalStore.setLogin);

      if (response.Status === "Success") {
        generalStore.setMessageError("");
        generalStore.setMessageSuccesss("Character added successfully!");
        showPopup(true);
        setTimeout(() => {
          navigate("/");
          this.resetCharacter();
        }, 3000);
      }
    } catch (error) {
      generalStore.setMessageError(error.toString());
    }
  };

  deleteCharacter = async (id) => {
    const options = {
      method: "DELETE",
    };
    const url = this.URL_DELETE + id;

    try {
      await fetchWithAuth(url, options, this.setLogin);
    } catch (error) {
      generalStore.setMessageError(error.toString());
    }
  };
}

const characterStore = new CharacterStore();
export default characterStore;
