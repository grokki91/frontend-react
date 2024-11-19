import React, { useEffect, useRef, useState } from "react";
import Popup from "./Popup";
import generalStore from "../store/GeneralStore";
import { observer } from "mobx-react-lite";
import characterStore from "../store/CharacterStore";

const Characters = observer(() => {
  const {messageError} = generalStore;
  const {characters, getCharacters, deleteCharacter} = characterStore;
  const [currentCharacter, setCurrentCharacter] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const popupRef = useRef(null);
  
  useEffect(() => {
    generalStore.setMessageError("");
    getCharacters()

    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPopupOpen])

  const handlePopupOpened = (character) => {
    setCurrentCharacter(character)
    setIsPopupOpen(true)
  }

  const handlePopupClosed = () => {
    setCurrentCharacter(null)
    setIsPopupOpen(false)
  }

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      handlePopupClosed()
    }
  }


  return (
    <div className="characters flex-center">
      {
        messageError || characters.map((character, id) => {
          return (
            <div key={id} className="character flex-center">
              <div className="character-field">Alias: {character.alias}</div>
              {/* <div className="character-field">Full name: {character.full_name}</div>
              <div className="character-field">Full name: {character.full_name}</div>
              <div className="character-field">Alignment: {character.alignment}</div>
              <div className="character-field">Abilities: {character.abilities}</div>
              <div className="character-field">Age: {character.age}</div>
              <div className="character-field">Team: {character.team}</div> */}
              <button className="info-btn" onClick={() => handlePopupOpened(character)}>View</button>
            </div>
          );
        })
      }
      {isPopupOpen && <Popup currentCharacter={currentCharacter} handleClosed={handlePopupClosed} popupRef={popupRef} deleteCharacter={deleteCharacter}/>}
    </div>
  )
});

export default Characters;
