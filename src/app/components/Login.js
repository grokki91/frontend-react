const Login = ({request, value, onChange, message, toggleAuth}) => {

  return (
    <>
      <div className="auth">
        <h1>Log in</h1>
        <div className="inputs">
          <input type="text" placeholder="Username" value={value.username} onChange={onChange} name="username" autoFocus/>
          <input type="password" placeholder="Password" value={value.password} onChange={onChange} name="password"/>
          {message}
        </div>
        <button onClick={request}>Log in</button>
        <div className="auth-suggest">
          <span>Don't have account? </span><button onClick={toggleAuth}>Sign up</button>
        </div>
      </div>
    </>
  )
}

export default Login;
