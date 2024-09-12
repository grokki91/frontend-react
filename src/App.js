import { useState } from "react";
import Auth from "./components/Auth";
import Films from "./components/Films";

function App() {
  const url = "http://localhost:8080/login";

  const [token, setToken] = useState('');
  const [isLogin, setLogin] = useState(false);
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });

  const handleSubmit = e => {
    const {name, value} = e.target
    setData(prev => ({...prev, [name]: value}))
  }

  const fetchLoginRequest = async () => {
    const options = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    await fetch(url, options)
      .then((response) => {
        return setToken(response.json());
      })
      .catch((e) => console.log(e));
  };

  let checkLogin = () => {
    let tokenStorage = localStorage.getItem('token')

    if (tokenStorage) {
      setLogin(true)
    }
  }

  return(
    <>
      {checkLogin ?
      <Auth loginRequest={fetchLoginRequest} isLogin={isLogin} value={{...data}} sumbit={handleSubmit}/> :
      <Films token={token} />}
    </>
  )
}

export default App;
