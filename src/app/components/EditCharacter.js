import React, { useEffect, useRef } from 'react';
import characterStore from '../store/CharacterStore';
import generalStore from '../store/GeneralStore';
import popupStore from '../store/PopupStore';
import { observer } from 'mobx-react-lite';
import messageStore from '../store/MessageStore';
import Spinner from './Spinner';
import Input from './Input';

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
          <Input getValue={getValue} name="alias" handleChange={handleChange}/>
          <Input getValue={getValue} name="fullname" handleChange={handleChange}/>

          <div className="character-field">
            <label htmlFor="alignment">Alignment:</label>
            <select id="alignment" value={getValue("alignment")} onChange={handleAlignmentChange} name="alignment">
              <option value="good">Good</option>
              <option value="evil">Evil</option>
            </select>
          </div>

          <Input getValue={getValue} name="abilities" handleChange={handleChange}/>
          <Input getValue={getValue} name="age" handleChange={handleChange}/>
          <Input getValue={getValue} name="team" handleChange={handleChange}/>

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
