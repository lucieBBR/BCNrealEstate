import React, { useState } from "react";

function Navbar() {
  const [isEng, changeEng] = useState(true)

   // Change language
   const changeLanguage = (event) => {
    changeEng(!isEng)
  }

  console.log(isEng)
  return (
    <nav className="Navbar">
      {/* Logo thanks to Canva, Link thanks to Imgur.com */}
      <img src="https://i.imgur.com/jfRaYkj.png" alt="Logo Barcelona Real Estate"></img>
      
      {isEng === true?
      <div className="eng">
        <a href="#heroSection">HOME</a>
        <a href="#mapSection">PROPERTIES</a>
        <a href="">ABOUT US</a>
        <a href="">CONTACT</a>
        <button className="switchLang" onClick={changeLanguage}>ES</button>
      </div>
    :
      <div className="de">
        <a href="#heroSection">HOME</a>
        <a href="#mapSection">PROPRIEDADES</a>
        <a href="">SOBRE NOSOTROS</a>
        <a href="">CONTACTO</a>
        <button className="switchLang" onClick={changeLanguage}>ENG</button>
      </div>
}

    </nav>
  );
}

export default Navbar;
