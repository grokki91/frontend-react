import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import popupStore from '../store/PopupStore';
import messageStore from '../store/MessageStore';

const Toaster = observer(() => {
    const {isToasterVisible, setToasterVisible} = popupStore;
    const {formSuccessMessage} = messageStore;

    useEffect(() => {
        if (isToasterVisible) {
            const timer = setTimeout(() => {
                setToasterVisible(false);
            }, 2000)

            return () => {
                clearTimeout(timer);
            }
        }
    }, [isToasterVisible])

    if (!isToasterVisible) return null;

    return (
        <div className='toaster flex-center fade-out'>
            <div className='message success'>{formSuccessMessage}</div>
        </div>
    );
});

export default Toaster;
