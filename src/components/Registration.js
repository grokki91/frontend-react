import { Link } from "react-router-dom";

const Registration = ({request, value, sumbit}) => {

  return (
    <>
      <div className="auth">
        <h1>Registration</h1>
        <input type="text" placeholder="Username" value={value.username} onChange={sumbit} />
        <input type="text" placeholder="Email" value={value.email} onChange={sumbit} />
        <input type="password" placeholder="Password" value={value.password} onChange={sumbit} />
        <Link to={'/'} onClick={request}>Sign Up</Link>
      </div>
    </>
  );
};

export default Registration;
