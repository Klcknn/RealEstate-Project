import React from "react";
import "./logo-loading.scss";
import smile from "./smile.png";
import home from "./home.png";

const LogoLoading = ({ size }) => {
  const hw = size || "200px";

  return (
    <>
      <div className="logo-loading">
        <img className="smile" src={smile} alt="logo" style={{ width: hw }} />
        <img className="home" src={home} alt="logo" style={{ width: hw }} />
        <img className="home1" src={home} alt="logo" style={{ width: hw }} />
        <img className="home2" src={home} alt="logo" style={{ width: hw }} />
      </div>
    </>
  );
};

export default LogoLoading;
