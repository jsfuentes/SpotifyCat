import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { axios } from "src/utils/utils.js";
import conf from "src/conf";
import Navbar from "src/components/Navbar";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import Loading from "src/components/Loading.js";
import SongList from "src/components/SongList.js";
const debug = require("debug")("app:pages:top");

const TOP_COUNT = 10;

import "../css/home.css";

function Home() {
  const [top, setTop] = useState(null);

  useEffect(() => {
    async function f() {
      try {
        const resp = await axios.get(`/api/spotify/top?limit=${TOP_COUNT}`);
        setTop(resp.data);
      } catch (err) {
        //redirect to login page if not logged in
        if (err.response.status === 401) {
          debug("Unauthorized");
          window.location.href = conf.get("CLIENT_URL") + "/auth/spotify";
        } else {
          console.error("Failed to fetch", err);
        }
      }
    }

    f();
  }, []);

  if (!top) return <Loading />;
  return (
    <>
      <div className="home-container">
        <Header />
        <SongList tracks={top.tracks}></SongList>
        <Footer></Footer>
      </div>
    </>
  );
}

export default Home;
