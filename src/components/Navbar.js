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
      <img src="https://i.imgur.com/j1eLLaG.png" alt="Logo Zurichaus Real Estate"></img>
      
      {isEng === true?
      <div className="eng">
        <a href="">HOME</a>
        <a href="">ABOUT US</a>
        <a href="">CONTACT</a>
        <button className="switchLang" onClick={changeLanguage}>DE</button>
      </div>
    :
      <div className="de">
        <a href="">HOME</a>
        <a href="">ÜBER UNS</a>
        <a href="">KONTAKT</a>
        <button className="switchLang" onClick={changeLanguage}>ENG</button>
      </div>
}

    </nav>
  );
}

export default Navbar;
