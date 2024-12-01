import React from 'react';
import Character from './characters/Character';
import { observer } from 'mobx-react-lite';

const Popup = observer(({popupRef, message}) => {

    return (
        <div className='popup-overlay flex-center'>
            {
                message ?
                <div className="popup">{message}</div> :
                <Character popupRef={popupRef}/>
            }
        </div>
    );
});

export default Popup;
