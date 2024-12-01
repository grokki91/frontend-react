import { useEffect } from "react";
import Auth from "./app/components/auth/Auth";
import HomePage from "./app/components/HomePage";
import { observer } from "mobx-react-lite";
import generalStore from "./app/store/GeneralStore";

const App = observer(() => {
  const {isLogin, checkLogin} = generalStore;

  useEffect(() => {
    checkLogin();
  }, []);


  return (
    <div className="container flex-center" style={{flexDirection: "column"}}>
      {isLogin ? (
        <HomePage />
      ) : (
        <div className="auth-wrapper flex-center">
          <Auth />
        </div>
      )}
    </div>
  );
})

export default App;
