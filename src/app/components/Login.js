import { observer } from "mobx-react-lite";
import userStore from "../store/UserStore";
import generalStore from "../store/GeneralStore";

const Login = observer(() => {
  const {login, inputStore} = userStore;
  const {getValue, handleChange, toggleAuth} = inputStore;
  const {messageError} = generalStore;

  return (
    <>
      <div className="auth flex-center">
        <h1>Log in</h1>
        <div className="inputs flex-center">
          <input type="text" placeholder="Username" value={getValue("username")} onChange={handleChange} name="username" autoFocus/>
          <input type="password" placeholder="Password" value={getValue("password")} onChange={handleChange} name="password"/>
          <div className="message">{messageError}</div>
        </div>
        <button onClick={() => login()}>Log in</button>
        <div className="auth-suggest">
          <span>Don't have account? </span><button onClick={toggleAuth}>Sign up</button>
        </div>
      </div>
    </>
  )
});

export default Login;
