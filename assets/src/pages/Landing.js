import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import conf from "src/conf";
import { axios } from "src/utils/utils.js";
import Navbar from "src/components/Navbar";
import Footer from "src/components/Footer";

export default function Landing() {
  function login() {
    window.location.href = conf.get("CLIENT_URL") + "/auth/spotify";
  }

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <Navbar />

      <div className="w-full p-12 flex-1 flex flex-col justify-center items-center">
        <div className="text-4xl block font-bold mb-4 text-center">
          View Your Top Songs and Artists!
        </div>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          type="button"
          onClick={login}
        >
          Login With Spotify
        </button>
      </div>

      <Footer />
    </div>
  );
}
