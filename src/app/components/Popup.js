import React from 'react';

const Popup = ({currentFilm, handleClosed, popupRef}) => {
    return (
        <div className='popup-overlay'>
            <div className='popup' ref={popupRef}>
                <button className='close-btn' onClick={handleClosed}>x</button>
                {currentFilm.title}
            </div>
        </div>
    );
}

export default Popup;
