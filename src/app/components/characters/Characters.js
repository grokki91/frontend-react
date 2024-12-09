import React, { useEffect, useRef } from "react";
import Popup from "../../elements/Popup";
import { observer } from "mobx-react-lite";
import characterStore from "../../store/CharacterStore";
import popupStore from "../../store/PopupStore";
import messageStore from "../../store/MessageStore";
import Spinner from "../../elements/Spinner";
import Toaster from "../../elements/Toaster";
import generalStore from "../../store/GeneralStore";

const Characters = observer(() => {
  const {generalErrorMessage, formSuccessMessage} = messageStore;
  const {characters, currentCharacter, getCharacters} = characterStore;
  const {isPopupOpened, handlePopupOpen, handleClickOutside} = popupStore;
  const {isMobile, checkMobile} = generalStore;
  const popupRef = useRef(null);
  
  useEffect(() => {
    getCharacters();
    checkMobile();

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

  const handlePopupOpenMobile = (character) => {
    if (isMobile) {
      handlePopupOpen(character)
    }
  };

  return (
    <main className="characters flex-center">
      {formSuccessMessage && <Toaster />}
      <Spinner className="spinner-transparent"/>
      {
        generalErrorMessage || characters.map((character, id) => {
          return (
            <div key={id} className="character character-box flex-center" onClick={() => handlePopupOpenMobile(character)}>
              <div className="form-field">{character.alias}</div>
              <button className="info-btn" onClick={() => handlePopupOpen(character)}>View</button>
            </div>
          );
        })
      }
      {isPopupOpened && currentCharacter && <Popup currentCharacter={currentCharacter} popupRef={popupRef} />}
    </main>
  )
});

export default Characters;
