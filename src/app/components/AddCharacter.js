import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import { observer } from "mobx-react-lite";
import characterStore from "../store/CharacterStore";
import popupStore from "../store/PopupStore";
import messageStore from "../store/MessageStore";

const AddCharacter = observer(() => {
  const {formErrorMessage, formSuccessMessage, setFormErrorMessage} = messageStore;
  const {alignment, handleAlignmentChange, inputStore, addCharacter, handleAgeChange, resetCharacter} = characterStore;
  const {handleChange, getValue} = inputStore;
  const {isPopupOpened, setPopupOpened} = popupStore;
  const navigate = useNavigate();

  useEffect(() => {
    resetCharacter();
    setFormErrorMessage("");
    return () => {
      setPopupOpened(false);
    }
  }, [])

  return (
    <main className="new-character flex-center">
      <h1>Add new character</h1>
      <div className="inputs flex-center">
        <input type="text" placeholder="Alias" value={getValue("alias")} onChange={handleChange} name="alias" />
        <input type="text" placeholder="Full Name" value={getValue("fullname")} onChange={handleChange} name="fullname" autoFocus />
        <div className="selection-group">
          <div className="selection-group-childes flex-center">
            <label><input type="radio" name="alignment" onChange={handleAlignmentChange} value="good" checked={alignment === "good"} />Good</label>
            <label><input type="radio" name="alignment" onChange={handleAlignmentChange} value="evil" checked={alignment === "evil"} />Evil</label>
          </div>
        </div>
        <input type="text" placeholder="Abilities" value={getValue("abilities")} onChange={handleChange} name="abilities" />
        <input type="text" placeholder="Age" value={getValue("age")} onChange={(e) => handleAgeChange(e)} name="age" />
        <input type="text" placeholder="Team" value={getValue("team")} onChange={handleChange} name="team" />
        <div className="message">{formErrorMessage}</div>
      </div>
      <button onClick={() => addCharacter(navigate)}>Add</button>
      {isPopupOpened && <Popup message={formSuccessMessage} />}
    </main>
  );
});

export default AddCharacter;
