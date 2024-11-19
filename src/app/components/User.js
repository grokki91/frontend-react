import { jwtDecode } from 'jwt-decode';
import React from 'react';
import UserStore from '../store/UserStore';

const User = () => {
    const token = localStorage.getItem("token");
    const userToken = jwtDecode(token);

    return (
        <main className='flex-center'>
            <div>{userToken.sub}</div>
            <div>{userToken.email}</div>
            <div>
                Change icon
            </div>
            <span onClick={() => UserStore.setlogin()}>fff</span>
        </main>
    );
}

export default User;
