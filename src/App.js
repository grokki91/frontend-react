import { useEffect, useState } from "react";
import Auth from "./app/components/Auth";
import HomePage from "./app/components/HomePage";
import Spinner from "./app/components/Spinner";

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
    username: "",
    password: "",
    email: "",
  });

  const checkFields = (fields) => {
    return fields.some((field) => {
      const value = data[field];
      return value === null || value === "" || value === "undefined";
    });
  };

  const loginFields = ["username", "password"];
  const registerFields = ["username", "email", "password"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchAuthRequest = async (url, fields) => {
    const isObjectEmpty = checkFields(fields);

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
    <div className="container">
      {isLoading && <Spinner />}
      {isLogin ? (
        <HomePage setLogin={setLogin} loading={isLoading} />
      ) : (
        <div className="auth-wrapper">
          <Auth
            authRequest={fetchAuthRequest}
            isLogin={isLogin}
            value={data}
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
