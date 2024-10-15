import React, { useEffect, useRef, useState } from "react";
import Popup from "./Popup";
import fetchWithAuth from "../utils/fetchWithAuth";

const Films = ({setLogin}) => {
  const [films, setFilms] = useState([])
  const [errMessage, setErrMessage] = useState('')
  const [currentFilm, setCurrentFilm] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const popupRef = useRef(null);
  
  useEffect(() => {
    fetchFilms()

    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isPopupOpen])

  const URL_FILMS = 'http://193.32.178.174:8080/api/films'

  const handlePopupOpened = (film) => {
    setCurrentFilm(film)
    setIsPopupOpen(true)
  }

  const handlePopupClosed = () => {
    setCurrentFilm(null)
    setIsPopupOpen(false)
  }

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      handlePopupClosed()
    }
  }

  const fetchFilms = async () => {
    try {
      const films = await fetchWithAuth(URL_FILMS, {method: 'GET'}, setLogin);
      console.log(films.json());
      setFilms(films)
    } catch (error) {
      setErrMessage(error.toString())
    }
  }


  return (
    <main className="films">
      {
        errMessage || films.map((film, id) => {
          return (
            <div key={id} className="film">
              <div className="film-title">Title: {film.title}</div>
              <div className="film-time">Time: {film.time}</div>
              <button className="info-btn" onClick={() => handlePopupOpened(film)}>Info</button>
            </div>
          );
        })
      }
      {isPopupOpen && <Popup currentFilm={currentFilm} handleClosed={handlePopupClosed} popupRef={popupRef}/>}
    </main>
  )
};

export default Films;
