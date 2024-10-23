const Registration = ({request, value, onChange, message, toggleAuth}) => {

  return (
    <>
      <div className="auth flex-center">
        <h1>Sign up</h1>
        <div className="inputs flex-center">
          <input type="text" placeholder="Username" value={value.username} onChange={onChange} name="username" autoFocus/>
          <input type="text" placeholder="Email" value={value.email} onChange={onChange} name="email"/>
          <input type="password" placeholder="Password" value={value.password} onChange={onChange} name="password"/>
          {message}
        </div>
        <button onClick={request}>Sign Up</button>
        <div className="auth-suggest">
          <span>Already registered? </span><button onClick={toggleAuth} id="submit">Log in</button>
        </div>
      </div>
    </>
  );
};

export default Registration;
