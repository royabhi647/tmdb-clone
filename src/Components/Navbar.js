import React from "react";
import Logo from './film.png'
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="border flex space-x-8 pl-12 items-center py-4">
      <img className="w-[50px] md:w-[55px]" src={Logo}/>
      <Link to="/">
        <div className="text-blue-400 font-bold text-xl md:text-3xl">Movies</div>
      </Link>
      <Link to="/fav">
        <div className="text-blue-400 font-bold text-xl md:text-3xl">Favourites</div>
      </Link>
    </div>
  );
}

export default Navbar;
