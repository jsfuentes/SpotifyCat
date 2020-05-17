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

  debug(top);
  if (!top) return <Loading />;
  return (
    <>
      <div className="home-container">
        <Header />
        <div className="song-list-container">
          <div className="text-3xl text-white w-full text-center">Your Top Songs</div>
          <SongList tracks={top.tracks.long_term} title={"Long Term"} />
          <SongList tracks={top.tracks.medium_term} title={"Medium Term"} />
          <SongList tracks={top.tracks.short_term} title={"Short Term"} />
          <br />
          <div className="text-3xl text-white w-full text-center">Your Top Artists</div>
          <SongList tracks={top.artists.long_term} title={"Long Term"} />
          <SongList tracks={top.artists.medium_term} title={"Medium Term"} />
          <SongList tracks={top.artists.short_term} title={"Short Term"} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
