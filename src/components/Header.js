import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <NavLink exact="true" to="/" activeclassname="active">
          Home
        </NavLink>
        <br></br>
        <NavLink to="/create" activeclassname="active">
          Create
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
