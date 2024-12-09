import React from 'react';
import Character from '../components/characters/Character';
import { observer } from 'mobx-react-lite';
import popupStore from '../store/PopupStore';
import { useNavigate } from 'react-router-dom';

const Popup = observer(({popupRef, message, isAddCharacter}) => {
    const {handlePopupCloseForced} = popupStore;
    const navigate = useNavigate();

    return (
        <div className='popup-overlay flex-center' onClick={() => isAddCharacter && handlePopupCloseForced(navigate)}>
            {
                message ?
                <div className="popup">{message}</div> :
                <Character popupRef={popupRef}/>
            }
        </div>
    );
});

export default Popup;
