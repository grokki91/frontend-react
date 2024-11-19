import Registration from "./Registration";
import Login from "./Login";
import generalStore from "../store/GeneralStore";
import { observer } from "mobx-react-lite";

const Auth = observer(() => {
  const {isSignUp} = generalStore;

  return (
    <>
      {
        !isSignUp ? <Login /> : <Registration />
      }
    </>
  );
});

export default Auth;
