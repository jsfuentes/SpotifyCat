import React from "react";
import Logo from "../img/logo.svg";

import "../css/header.css";

  // return (
  //   <footer className="bg-gray-200 w-full h-auto py-12">
  //     <div className="container mx-auto">
  //       <div className="flex justify-center sm:justify-start">
  //         <Logo />
  //       </div>
  //       <p className="flex justify-center sm:justify-start items-center mt-8 mb-4 text-gray-700">
  //         <span>Made with</span>{" "}
  //         <img
  //           className="inline w-4 h-auto mx-5px"
  //           src={HeartImg}
  //           alt="Heart"
  //         />
  //         <span>on Earth</span>
  //       </p>
  //       <p className="text-sm text-gray-500 text-center sm:text-left">
  //         © {moment().year()} Modulo Inc.
  //       </p>
  //     </div>
  //   </footer>
  // );
export default function Header() {
  return (
    <div class="header">
    <div class="header-right">
        <a href="#home">Logout</a>
      </div>
      <a href="/" class="logo"><div><img src={Logo} alt="logo"/> <p>Spotify Cat</p></div></a>
      
    </div> 
  );
}
