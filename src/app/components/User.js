import React, { useEffect } from 'react';
import UserStore from '../store/UserStore';
import userStore from '../store/UserStore';
import { jwtDecode } from 'jwt-decode';
import { observer } from 'mobx-react-lite';

const User = observer(() => {
    const {inputStore, getUser} = userStore;
    const {getValue, handleChange, setState} = inputStore;

    const token = localStorage.getItem("token");
    const userToken = jwtDecode(token);

    useEffect( () => {
        getUser(userToken.id).then(user => {
          if (user) {
            setState("username", user.username);
            setState("email", user.email);
            setState("birthday", user.birthday);
          }
        });
    }, [])

    return (
        <main className='flex-center'>
          <div className="character-field">
            <label htmlFor="alias">Username:</label>
            <input id="alias" type="text" value={getValue("username")} onChange={handleChange} name="username"/>
          </div>

          <div className="character-field">
            <label htmlFor="full_name">Email:</label>
            <input id="full_name" type="text" value={getValue("email")} onChange={handleChange} name="email"/>
          </div>

          <div className="character-field">
            <label htmlFor="full_name">Birthday:</label>
            <input id="full_name" type="text" value={getValue("birthday")} onChange={handleChange} name="birthday"/>
          </div>

            <div>
                Change icon
            </div>
            <span onClick={() => UserStore.setlogin()}>fff</span>
        </main>
    );
});

export default User;
