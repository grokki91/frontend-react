import React from 'react';
import Character from './Character';

const Popup = ({currentCharacter, handleClosed, popupRef, message, deleteCharacter}) => {
    return (
        <div className='popup-overlay flex-center'>
            {
                message ?
                <div className="popup">{message}</div> :
                <Character currentCharacter={currentCharacter} handleClosed={handleClosed} popupRef={popupRef} remove={deleteCharacter}/>
            }
        </div>
    );
}

export default Popup;
