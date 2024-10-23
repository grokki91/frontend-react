import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";

const AddCharacter = ({character, onChange, message, setMessage, request, setCharacter}) => {
  const [resultMessage, setResultMessage] = useState('');
  const [isPopupVissible, setPopupVissible] = useState(false);
  const [selected, setSelected] = useState(1);
  const navigate = useNavigate();

  const URL_ADD_CHARACTER = "http://193.32.178.174:8080/api/characters/add";

  const checkInputIsNumber = (str) => {
    const reg = /^\d+(\.\d+)?$/
    return reg.test(str)
  }

  const handleAgeChange = (e) => {
    const { value } = e.target;

    if (checkInputIsNumber(value) || value === '') {
      setMessage('')
      onChange(e, setCharacter)
      return
    } 
    setMessage('Only numbers are allowed in the Age field')
  }

  const fetchResult = async () => {
    try {
      const response = await request(URL_ADD_CHARACTER);
      if (response.Status === 'Success') {
        setResultMessage('Character added successfully!')
        setPopupVissible(true)
        setTimeout(() => {
          navigate('/')
        }, 3000)
      } else {
        console.log('Ошибка = ', response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAlignmentChange = (e) => {
    const { name, value } = e.target;
    setCharacter(prev => ({
      ...prev,
      [name]: value
    }));
    setSelected(value);
  };
  

  return <>
      <div className="new-character flex-center">
        <h1>Add new film</h1>
        <div className="inputs flex-center">
          <input type="text" placeholder="Alias" value={character.alias || ''} onChange={e => onChange(e, setCharacter)} name="alias" />
          <input type="text" placeholder="Full Name" value={character.full_name || ''} onChange={e => onChange(e, setCharacter)} name="full_name" autoFocus />
          <div className="alignment">
            <div>Aligement:</div>
            <div className="alignment-childes flex-center">
              <label>
                <input type="radio" name="alignment" onChange={handleAlignmentChange} value='good' checked={selected === 'good'}/>
                Good
              </label>
              <label>
                <input type="radio" name="alignment" onChange={handleAlignmentChange} value='evil' checked={selected === 'evil'}/>
                Evil
              </label>
            </div>
          </div>
          <input type="text" placeholder="Abilities" value={character.abilities || ''} onChange={e => onChange(e, setCharacter)} name="abilities" />
          <input type="text" placeholder="Age" value={character.age || ''} onChange={e => handleAgeChange(e)} name="age" />
          <input type="text" placeholder="Team" value={character.team || ''} onChange={e => onChange(e, setCharacter)} name="team" />
          <div className="message">{message}</div>
        </div>
        <button onClick={() => fetchResult()}>Add</button>
        {isPopupVissible && <Popup message={resultMessage} />}
      </div>
  </>
};

export default AddCharacter;
