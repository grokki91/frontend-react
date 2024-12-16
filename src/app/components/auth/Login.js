import { observer } from "mobx-react-lite";
import userStore from "../../store/UserStore";
import messageStore from "../../store/MessageStore";

const Login = observer(() => {
  const {login, inputStore} = userStore;
  const {getValue, handleChange, toggleAuth} = inputStore;
  const {formErrorMessage} = messageStore;

  return (
    <>
      <div className="auth flex-center">
        <h2>Log in</h2>
        <div className="inputs flex-center">
          <input type="text" placeholder="Username" value={getValue("username")} onChange={handleChange} name="username" />
          <input type="password" placeholder="Password" value={getValue("password")} onChange={handleChange} name="password"/>
          <div className="message">{formErrorMessage}</div>
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
