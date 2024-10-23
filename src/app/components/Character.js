import React from 'react';

const Character = ({currentCharacter={}, handleClosed, popupRef, remove}) => {
    let URL_DELETE = 'http://193.32.178.174:8080/api/characters/'

    if (currentCharacter && currentCharacter.id) {
        URL_DELETE += currentCharacter.id
    }

    const handleRemove = async () => {
        try {
            await remove(URL_DELETE);
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
}

export default Character;
