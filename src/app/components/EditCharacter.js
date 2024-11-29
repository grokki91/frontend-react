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
  const {formErrorMessage, setFormErrorMessage, resetMessages} = messageStore;
  const {
    currentCharacter, inputStore, checkFields, handleAgeChange, handleAlignmentChange, 
    resetCharacter, updateCharacter, hasChanges, fetchCharacter
  } = characterStore;
  const {handleChange, getValue} = inputStore;
  const {setPopupOpened, handlePopupClose} = popupStore;
  const popupRef = useRef(null);

  useEffect(() => {
    fetchCharacter();

    return () => {
      resetMessages();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

          <div className="form-field">
            <label htmlFor="alignment">Alignment:</label>
            <select id="alignment" value={getValue("alignment")} onChange={handleAlignmentChange} name="alignment">
              <option value="good">Good</option>
              <option value="evil">Evil</option>
            </select>
          </div>

          <Input getValue={getValue} name="abilities" handleChange={handleChange} isTextArea={true}/>
          <Input getValue={getValue} name="age" handleChange={handleAgeChange}/>
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
