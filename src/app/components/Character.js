import { observer } from 'mobx-react-lite';
import React from 'react';
import characterStore from '../store/CharacterStore';
import EditCharacter from './EditCharacter';
import popupStore from '../store/PopupStore';
import generalStore from '../store/GeneralStore';

const Character = observer(({popupRef}) => {
    const {isEditing, setEditing} = generalStore;
    const {currentCharacter, deleteCharacter} = characterStore;
    const {handlePopupClose} = popupStore;

    const handleRemove = () => {
        deleteCharacter(currentCharacter.id);
        handlePopupClose()
    }

    const handleEdit = () => {
        setEditing(true);
    }

    return (
        <>
            {isEditing
                ? <EditCharacter />
                :
                (
                    <div className='popup' ref={popupRef}>
                        <div className="character-field">Alias: {currentCharacter.alias}</div>
                        <div className="character-field">Full name: {currentCharacter.full_name}</div>
                        <div className="character-field">Alignment: {currentCharacter.alignment}</div>
                        <div className="character-field">Abilities: {currentCharacter.abilities}</div>
                        <div className="character-field">Age: {currentCharacter.age}</div>
                        <div className="character-field">Team: {currentCharacter.team}</div>

                        <button className='close-btn' onClick={() => handlePopupClose()}>&#10006;</button>
                        <button className='popup-btn' onClick={() => handleEdit()}>Edit</button>
                        <button className='popup-btn' onClick={() => handleRemove()}>Delete</button>
                    </div>
                )
            }
        </>
    );
});

export default Character;
