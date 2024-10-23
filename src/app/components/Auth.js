import Registration from "./Registration";
import Login from "./Login";

const Auth = ({
  authRequest,
  value,
  onChange,
  message,
  toggleAuth,
  isSignUp,
  requireFields,
  setData
}) => {
  const URL_LOGIN = "http://193.32.178.174:8080/login";
  const URL_REGISTRATION = "http://193.32.178.174:8080/signup";

  const messageExpression = message ? (
    <div className="message">{message}</div>
  ) : (
    ""
  );

  return (
    <>
      {!isSignUp ? (
        <Login
          request={() => authRequest(URL_LOGIN, requireFields)}
          value={value}
          onChange={(e) => onChange(e, setData)}
          message={messageExpression}
          toggleAuth={toggleAuth}
        />
      ) : (
        <Registration
          request={() => authRequest(URL_REGISTRATION, requireFields)}
          value={value}
          onChange={(e) => onChange(e, setData)}
          message={messageExpression}
          toggleAuth={toggleAuth}
        />
      )}
    </>
  );
};

export default Auth;
