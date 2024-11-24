import React, { useEffect, useRef } from 'react';
import characterStore from '../store/CharacterStore';
import generalStore from '../store/GeneralStore';
import popupStore from '../store/PopupStore';
import { observer } from 'mobx-react-lite';
import messageStore from '../store/MessageStore';
import Spinner from './Spinner';

const EditCharacter = observer(() => {
  const {setEditing} = generalStore;
  const {formErrorMessage, setFormErrorMessage} = messageStore;
  const {currentCharacter, inputStore, checkFields, handleAgeChange, handleAlignmentChange, resetCharacter, updateCharacter, hasChanges} = characterStore;
  const {handleChange, getValue, setState} = inputStore;
  const {setPopupOpened, handlePopupClose} = popupStore;
  const popupRef = useRef(null);

  useEffect(() => {
    if (currentCharacter) {
      setState("alias", currentCharacter.alias || "");
      setState("fullname", currentCharacter.fullname || "");
      setState("alignment", currentCharacter.alignment || "good");
      setState("abilities", currentCharacter.abilities || "");
      setState("age", currentCharacter.age || "");
      setState("team", currentCharacter.team || "");
    }

    return () => {
      setFormErrorMessage("");
    }
  }, [])

  const handleSave = () => {
    if (checkFields()) {
      setFormErrorMessage("All fields must be filled in");
      return;
    }

    if (!hasChanges()) {
      setFormErrorMessage("No changes");
      return;
    }
  
    updateCharacter(currentCharacter.id);
  };
  
  const close = () => {
    handlePopupClose();
    setEditing(false);
    setPopupOpened(false);
  }

  return (
      <>
        <Spinner />
        <div className="popup edit-character" ref={popupRef}>

          <div className="character-field">
            <label htmlFor="alias">Alias:</label>
            <input id="alias" type="text" value={getValue("alias")} onChange={handleChange} name="alias"/>
          </div>

          <div className="character-field">
            <label htmlFor="full_name">Full name:</label>
            <input id="full_name" type="text" value={getValue("fullname")} onChange={handleChange} name="fullname"/>
          </div>

          <div className="character-field">
            <label htmlFor="alignment">Alignment:</label>
            <select id="alignment" value={getValue("alignment")} onChange={handleAlignmentChange} name="alignment">
              <option value="good">Good</option>
              <option value="evil">Evil</option>
            </select>
          </div>

          <div className="character-field">
            <label htmlFor="abilities">Abilities:</label>
            <textarea id="abilities" value={getValue("abilities")} onChange={handleChange} name="abilities" />
          </div>

          <div className="character-field">
            <label htmlFor="age">Age:</label>
            <input id="age" type="text" value={getValue("age")} onChange={handleAgeChange} name="age"/>
          </div>

          <div className="character-field">
            <label htmlFor="team">Team:</label>
            <input id="team" type="text" value={getValue("team")} onChange={handleChange} name="team"/>
          </div>

          <div className="message">{formErrorMessage}</div>

          <div className="popup-buttons">
            <button className="close-btn" onClick={close}> &#10006; </button>
            <button className="popup-btn" onClick={handleSave}>Save</button>
            <button className="popup-btn" onClick={resetCharacter}>Reset</button>
          </div>
        </div>
      </>
    );
    
});

export default EditCharacter;
