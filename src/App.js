import { useEffect, useState } from "react";
import Auth from "./app/components/Auth";
import HomePage from "./app/components/HomePage";
import Spinner from "./app/components/Spinner";
import fetchWithAuth from "./app/utils/fetchWithAuth";

function App() {
  useEffect(() => {
    checkLogin();
  }, []);

  const [, setToken] = useState("");
  const [isLogin, setLogin] = useState(false);
  const [message, setMessage] = useState("");
  const [isSignUp, setSignUp] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({
    "username": "",
    "password": "",
    "email": ""
});
  const [character, setCharacter] = useState({
    "alias": "",
    "full_name": "",
    "alignment": "good",
    "abilities": "",
    "age": "",
    "team": ""
});

  const checkFields = (fields, obj) => {
    return fields.some((field) => {
      const value = obj[field];
      return value === null || value === "" || value === "undefined";
    });
  };

  const loginFields = ["username", "password"];
  const registerFields = ["username", "email", "password"];
  const characterFields = ["alias", "full_name", "alignment", "abilities", "age", "team"];

  const handleChange = (e, setState) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  const fetchAuthRequest = async (url, fields) => {
    const isObjectEmpty = checkFields(fields, data);

    if (isObjectEmpty) {
      setMessage("There are empty fields");
      return;
    }

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    try {
      setLoading(true);
      const response = await fetch(url, options);
      const result = await response.json();

      if (response.ok) {
        setMessage('');
        setToken(result.token);
        localStorage.setItem("token", result.token);
        setLogin(true);
      } else {
        setMessage(result.Message);
      }
    } catch (error) {
      setMessage("Server connection refused");
    } finally {
      setLoading(false);
    }
  };

  const fetchAddCharacter = async (url) => {
    const isObjectEmpty = checkFields(characterFields, character);

    if (isObjectEmpty) {
      console.log(character);
      setMessage("All fields must be filled in");
      return;
    }

    const options = {
      method: "POST",
      body: JSON.stringify(character),
    };

    try {
      const newCharacter = await fetchWithAuth(url, options, setLogin);
      setCharacter(newCharacter);
      return newCharacter;
    } catch (error) {
      setMessage("Server connection refused");
    }
  };

  const fetchDeleteCharacter = async (url) => {
    const options = {
      method: "DELETE",
    };

    try {
      await fetchWithAuth(url, options, setLogin);
      setMessage("Character deleted successfully");
    } catch (error) {
      setMessage("Server connection refused");
    }
  }

  const toggleAuth = () => {
    setSignUp((prev) => !prev);
    setData({
      username: "",
      email: "",
      password: "",
    });
    setMessage("");
  };

  let checkLogin = () => {
    let tokenStorage = localStorage.getItem("token");

    if (tokenStorage) {
      setToken(tokenStorage);
      setLogin(true);
    }
  };

  return (
    <div className="container flex-center">
      {isLoading && <Spinner />}
      {isLogin ? (
        <HomePage
          setLogin={setLogin}
          loading={isLoading}
          onChange={handleChange}
          message={message}
          setMessage={setMessage}
          character={character}
          request={fetchAddCharacter}
          requireFields={characterFields}
          setCharacter={setCharacter}
          isLoading={isLoading}
          setLoading={setLoading}
          deleteCharacter={fetchDeleteCharacter}
        />
      ) : (
        <div className="auth-wrapper flex-center">
          <Auth
            authRequest={fetchAuthRequest}
            isLogin={isLogin}
            value={data}
            setData={setData}
            onChange={handleChange}
            message={message}
            toggleAuth={toggleAuth}
            isSignUp={isSignUp}
            requireFields={isSignUp ? registerFields : loginFields}
          />
        </div>
      )}
    </div>
  );
}

export default App;
