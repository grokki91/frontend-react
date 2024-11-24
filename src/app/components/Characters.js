import React, { useEffect, useRef } from "react";
import Popup from "./Popup";
import { observer } from "mobx-react-lite";
import characterStore from "../store/CharacterStore";
import popupStore from "../store/PopupStore";
import messageStore from "../store/MessageStore";
import Spinner from "./Spinner";
import generalStore from "../store/GeneralStore";

const Characters = observer(() => {
  const {generalErrorMessage, setGeneralErrorMessage} = messageStore;
  const {characters, currentCharacter, getCharacters} = characterStore;
  const {isPopupOpened, handlePopupOpen, handleClickOutside} = popupStore;
  const {isLoading} = generalStore;
  const popupRef = useRef(null);
  
  useEffect(() => {
    setGeneralErrorMessage("");
    getCharacters();

    const handlePopupOutsideClick = (event) => {
      handleClickOutside(event, popupRef);
    };
  

    if (isPopupOpened) {
      document.addEventListener('mousedown', handlePopupOutsideClick)
    } else {
      document.removeEventListener('mousedown', handlePopupOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handlePopupOutsideClick)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPopupOpened, getCharacters])

  return (
    <div className="characters flex-center">
      <Spinner className="spinner-transparent"/>
      {
        generalErrorMessage || characters.map((character, id) => {
          return (
            <div key={id} className="character flex-center">
              <div className="character-field">Alias: {character.alias}</div>
              {/* <div className="character-field">Full name: {character.full_name}</div>
              <div className="character-field">Full name: {character.full_name}</div>
              <div className="character-field">Alignment: {character.alignment}</div>
              <div className="character-field">Abilities: {character.abilities}</div>
              <div className="character-field">Age: {character.age}</div>
              <div className="character-field">Team: {character.team}</div> */}
              <button className="info-btn" onClick={() => handlePopupOpen(character)}>View</button>
            </div>
          );
        })
      }
      {isPopupOpened && currentCharacter && <Popup currentCharacter={currentCharacter} popupRef={popupRef} />}
    </div>
  )
});

export default Characters;
