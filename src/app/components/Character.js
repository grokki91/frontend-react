import { observer } from 'mobx-react-lite';
import React from 'react';
import characterStore from '../store/CharacterStore';

const Character = observer(({currentCharacter={}, handleClosed, popupRef, remove}) => {
    const {deleteCharacter} = characterStore;

    const handleRemove = async () => {
        try {
            await deleteCharacter(currentCharacter.id);
            handleClosed()
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = async () => {
        try {
            handleClosed()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='popup' ref={popupRef}>
            <div className="character-field">Alias: {currentCharacter.alias}</div>
            <div className="character-field">Full name: {currentCharacter.full_name}</div>
            <div className="character-field">Alignment: {currentCharacter.alignment}</div>
            <div className="character-field">Abilities: {currentCharacter.abilities}</div>
            <div className="character-field">Age: {currentCharacter.age}</div>
            <div className="character-field">Team: {currentCharacter.team}</div>

            <button className='close-btn' onClick={handleClosed}>&#10006;</button>
            <button className='popup-btn' onClick={() =>handleEdit()}>Edit</button>
            <button className='popup-btn' onClick={() =>handleRemove()}>Delete</button>
        </div>
    );
});

export default Character;
