import React, { useEffect, useRef, useState } from "react";
import Popup from "./Popup";
import fetchWithAuth from "../utils/fetchWithAuth";
import Spinner from "./Spinner";

const Characters = ({setLogin, isLoading, setLoading, deleteCharacter}) => {
  const [characters, setCharacters] = useState([])
  const [errMessage, setErrMessage] = useState('')
  const [currentCharacter, setCurrentCharacter] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const popupRef = useRef(null);
  
  useEffect(() => {
    fetchCharacters()

    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPopupOpen])

  const URL_CHARACTERS = 'http://193.32.178.174:8080/api/characters'

  const handlePopupOpened = (film) => {
    setCurrentCharacter(film)
    setIsPopupOpen(true)
  }

  const handlePopupClosed = () => {
    setCurrentCharacter(null)
    setIsPopupOpen(false)
  }

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      handlePopupClosed()
    }
  }

  const fetchCharacters = async () => {
    try {
      const characters = await fetchWithAuth(URL_CHARACTERS, {method: 'GET'}, setLogin);
      setCharacters(characters)
    } catch (error) {
      setErrMessage(error.toString())
    } finally {
      setLoading(false)
    }
  }


  return (
    <main className="characters flex-center">
      {isLoading && <Spinner />}
      {
        errMessage || characters.map((character, id) => {
          return (
            <div key={id} className="character flex-center">
              <div className="character-field">Alias: {character.alias}</div>
              {/* <div className="character-field">Full name: {character.full_name}</div>
              <div className="character-field">Full name: {character.full_name}</div>
              <div className="character-field">Alignment: {character.alignment}</div>
              <div className="character-field">Abilities: {character.abilities}</div>
              <div className="character-field">Age: {character.age}</div>
              <div className="character-field">Team: {character.team}</div> */}
              <button className="info-btn" onClick={() => handlePopupOpened(character)}>View</button>
            </div>
          );
        })
      }
      {isPopupOpen && <Popup currentCharacter={currentCharacter} handleClosed={handlePopupClosed} popupRef={popupRef} deleteCharacter={deleteCharacter}/>}
    </main>
  )
};

export default Characters;
