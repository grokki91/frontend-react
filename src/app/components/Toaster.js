import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import popupStore from '../store/PopupStore';
import messageStore from '../store/MessageStore';

const Toaster = observer(() => {
    const {isToasterVisible, setToasterVisible, isFadeOut, setFadeOut} = popupStore;
    const {formSuccessMessage} = messageStore;

    useEffect(() => {
        if (isToasterVisible) {
            setFadeOut(false);

            const timer = setTimeout(() => {
                setFadeOut(true);
                setToasterVisible(false);
            }, 3000)

            return () => {
                clearTimeout(timer);
            }
        }
    }, [isToasterVisible])

    if (!isToasterVisible) return null;

    return (
        <div className={`toaster flex-center ${isFadeOut ? 'fade-out' : ''}`}>
            <div className='message success'>{formSuccessMessage}</div>
        </div>
    );
});

export default Toaster;
