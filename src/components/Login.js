import { Link } from "react-router-dom";

const Login = ({request, value, sumbit}) => {

  return (
    <>
      <div className="auth">
        <h1>Login</h1>
        <input type="text" placeholder="Username" value={value.username} onChange={sumbit}/>
        <input type="password" placeholder="Password" value={value.password} onChange={sumbit}/>
        <Link to={'/'} onClick={request}>Sign In</Link>
      </div>
    </>
  )
}

export default Login;
