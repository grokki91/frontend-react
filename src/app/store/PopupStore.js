import { makeAutoObservable } from "mobx";
import characterStore from "./CharacterStore";

class PopupStore {
  isPopupOpened = false;
  isToasterVisible = false;

  constructor() {
    makeAutoObservable(this);
  }

  setPopupOpened = (isPopupOpened) => {
    this.isPopupOpened = isPopupOpened;
  };

  setToasterVisible = (isToasterVisible) => {
    this.isToasterVisible = isToasterVisible;
  };

  handlePopupOpen = (character) => {
    characterStore.setCurrentCharacter(character);
    this.setPopupOpened(true);
  };

  handlePopupClose = () => {
    characterStore.setCurrentCharacter(null);
    this.setPopupOpened(false);
  };

  handleClickOutside = (event, popupRef) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      this.handlePopupClose();
    }
  };
}

const popupStore = new PopupStore();
export default popupStore;
