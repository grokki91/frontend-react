import { observer } from "mobx-react-lite";
import React from "react";
import generalStore from "../store/GeneralStore";

const Spinner = observer(({className = ""}) => {
  const {isLoading} = generalStore;

  if (!isLoading) return false;

  return (
    <div className={`spinner-overlay flex-center ${className}`}>
      <div className="spinner"></div>
    </div>
  );
});

export default Spinner;
