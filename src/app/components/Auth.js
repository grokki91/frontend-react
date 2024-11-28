import Registration from "./Registration";
import Login from "./Login";
import generalStore from "../store/GeneralStore";
import { observer } from "mobx-react-lite";
import Spinner from "./Spinner";

const Auth = observer(() => {
  const {isSignUp} = generalStore;

  return (
    <>
      <Spinner />
      { !isSignUp ? <Login /> : <Registration /> }
    </>
  );
});

export default Auth;
