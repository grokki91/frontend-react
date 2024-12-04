import { observer } from "mobx-react-lite";
import userStore from "../../store/UserStore";
import messageStore from "../../store/MessageStore";

const Registration = observer(() => {
  const {gender, handleGenderChange, registration, inputStore} = userStore;
  const {getValue, handleChange, toggleAuth} = inputStore;
  const {formErrorMessage} = messageStore;

  return (
    <>
      <div className="auth flex-center registration">
        <h2>Sign up</h2>
        <div className="inputs flex-center">
          <input type="text" placeholder="Username" value={getValue("username")} onChange={handleChange} name="username" autoFocus/>
          <input type="text" placeholder="Email" value={getValue("email")} onChange={handleChange} name="email"/>
          <input type="password" placeholder="Password" value={getValue("password")} onChange={handleChange} name="password"/>
          <div className="selection-group">
            <div className="selection-group-childes flex-center">
              <label><input type="radio" name="gender" onChange={handleGenderChange} value="male" checked={gender === "male"} />Male</label>
              <label><input type="radio" name="gender" onChange={handleGenderChange} value="female" checked={gender === "female"} />Female</label>
            </div>
          </div>
          <input mask="9999-99-99" type="date" placeholder="YYYY-MM-DD" value={getValue("birthday")} onChange={handleChange} name="birthday"/>
          <div className="message">{formErrorMessage}</div>
        </div>
        <button onClick={() => registration()}>Sign Up</button>
        <div className="auth-suggest">
          <span>Already registered? </span><button onClick={toggleAuth} id="submit">Log in</button>
        </div>
      </div>
    </>
  );
});

export default Registration;