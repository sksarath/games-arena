import React from 'react';
import './header.css';

const Header = () => {
  return(
    <header className="header">
      <div className="max-width">
        <img src={require("../../img/logo.svg")} className="logo" alt="Games Arena"/>
        <h1 className="heading">Games Arena</h1>
      </div>
    </header>
  )
}
export default Header;