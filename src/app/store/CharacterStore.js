import { makeAutoObservable } from "mobx";
import InputStore from "./InputStore";
import generalStore from "./GeneralStore";
import fetchWithAuth from "../utils/fetchWithAuth";
import popupStore from "./PopupStore";
import messageStore from "./MessageStore";

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

  resetCharacter = () => {
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
      messageStore.setFormErrorMessage("");
      this.inputStore.handleChange(e);
    } else {
      messageStore.setFormErrorMessage("Only numbers are allowed in the Age field");
    }
  };

  handleAlignmentChange = (e) => {
    const { name, value } = e.target;
    this.inputStore.setState(name, value);
    this.setAlignment(value);
  };

  getCharacters = async () => {
    try {
      generalStore.setLoading(true);
      const response = await fetchWithAuth(this.URL_CHARACTERS, {method: 'GET'}, generalStore.setLogin);
      this.setCharacters(response)
    } catch (error) {
      messageStore.setGeneralErrorMessage(error.toString())
    } finally {
      generalStore.setLoading(false);
    }
  }

  addCharacter = async (navigate) => {
    const options = {
      method: "POST",
      body: JSON.stringify(this.inputStore.state),
    };

    if (this.checkFields()) {
      messageStore.setFormErrorMessage("All fields must be filled in");
      return;
    }

    try {
      const response = await fetchWithAuth(this.URL_ADD, options, generalStore.setLogin);
      if (response.Status === "Success") {
        popupStore.setPopupOpened(true);
        messageStore.setFormErrorMessage("");
        messageStore.setFormSuccessMessage("Character added successfully!");
        setTimeout(() => {
          navigate("/");
          this.resetCharacter();
          this.getCharacters();
        }, 2000);
      } 
    } catch (error) {
      messageStore.setFormErrorMessage(error.toString());
    } 
  };

  deleteCharacter = async (id) => {
    const options = {
      method: "DELETE",
    };
    const url = this.URL_CHARACTERS + "/" + id;

    try {
      await fetchWithAuth(url, options, this.setLogin);
      this.setCharacters(this.characters.filter(character => character.id !== id));
    } catch (error) {
      messageStore.setFormErrorMessage(error.toString());
    }
  };

  updateCharacter = async (id) => {
    const options = {
      method: "PATCH",
      body: JSON.stringify(this.inputStore.state)
    };

    const url = this.URL_CHARACTERS + "/" + id;

    try {
      generalStore.setLoading(true);
      const response = await fetchWithAuth(url, options, this.setLogin);
      if (response.Status === "Success") {
        popupStore.handlePopupClose();
        popupStore.setPopupOpened(false);
        generalStore.setEditing(false);
      } 
    } catch (error) {
      messageStore.setFormErrorMessage(error.toString());
    } finally {
      generalStore.setLoading(false);
    }
  };

  hasChanges = () => {
    return this.fields.some((field) => 
      this.inputStore.getValue(field) !== this.currentCharacter[field]
    );
  };

  fetchCharacter = () => {
    if (this.currentCharacter) {
      this.inputStore.setState("alias", this.currentCharacter.alias || "");
      this.inputStore.setState("fullname", this.currentCharacter.fullname || "");
      this.inputStore.setState("alignment", this.currentCharacter.alignment || "good");
      this.inputStore.setState("abilities", this.currentCharacter.abilities || "");
      this.inputStore.setState("age", this.currentCharacter.age || "");
      this.inputStore.setState("team", this.currentCharacter.team || "");
    }
  }
}

const characterStore = new CharacterStore();
export default characterStore;
