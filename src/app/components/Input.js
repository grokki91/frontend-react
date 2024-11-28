import { observer } from 'mobx-react-lite';
import React from 'react';

const Input = observer(({getValue, name, handleChange, isTextArea}) => {
    return (
        <div className="character-field">
            <label htmlFor={`${name}`}>{name}:</label>
            {!isTextArea ? <input id={name} type="text" value={getValue(name)} onChange={handleChange} name={name}/> :
            <textarea id={name} value={getValue(name)} onChange={handleChange} name={name}/>}
        </div>
    );
});

export default Input;
