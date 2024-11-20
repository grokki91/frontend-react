import { makeAutoObservable } from "mobx";
import InputStore from "./InputStore";
import generalStore from "./GeneralStore";
import fetchWithAuth from "../utils/fetchWithAuth";
import popupStore from "./PopupStore";

class CharacterStore {
  URL_CHARACTERS = 'http://193.32.178.174:8080/api/characters'
  URL_ADD = "http://193.32.178.174:8080/api/characters/add";
  URL_DELETE = "http://193.32.178.174:8080/api/characters/";
  characters = [];
  currentCharacter = null;
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

  setCurrentCharacter = (currentCharacter) => {
    this.currentCharacter = currentCharacter;
  }

  setAlignment(alignment) {
    this.alignment = alignment;
  }

  resetCharacter(){
    this.inputStore.resetState();
    this.inputStore.setState("alignment", "good");
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

  addCharacter = async (navigate) => {
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
        popupStore.setPopupOpened(true);
        generalStore.setMessageError("");
        generalStore.setMessageSuccesss("Character added successfully!");
        setTimeout(() => {
          navigate("/");
          this.resetCharacter();
          this.getCharacters();
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
      this.setCharacters(this.characters.filter(character => character.id !== id));
    } catch (error) {
      generalStore.setMessageError(error.toString());
    }
  };
}

const characterStore = new CharacterStore();
export default characterStore;
