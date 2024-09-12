import Registration from "./Registration";
import Login from "./Login";

const Auth = ({loginRequest, isLogin, value, submit}) => {

  return <>
  { isLogin ? 
    <Login request={loginRequest} value={value} submit={submit}/> : 
    <Registration request={loginRequest} value={value} submit={submit}/>}
  </>;
};

export default Auth;
