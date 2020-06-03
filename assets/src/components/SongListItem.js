import React, { useState, useEffect } from "react";

import classNames from "classnames";

import PropTypes from "prop-types";
import Cover from "../img/cover.jpg";

import "../css/song_list_item.css";

import playImg from "src/img/play.svg";
import pauseImg from "src/img/pause.svg";

// className={classnames('pill', this.props.styleName)}
//  	  	<div className="song-listing-item song-listing-item-primary-1">



// TODO: handle when song titles are really long and overflow
function SongListItem(props) {
  const [audioFile, setAudioFile] = useState(null);
  const [playing, setPlaying] = useState(null);
  const [hovered, setHover] = useState(null);

  let imageUrl, title, subtitle, onClick;
  const track = props.track;
  useEffect(() => {
    if (track.type === "track") {
      const audioFile = new Audio(track.preview_url)
      setAudioFile(audioFile);
    }
    setHover(false)
  }, [])
  console.log(track)
  if (track.type === "track") {
    imageUrl = track.album.images[0].url;
    title = track.name;
    subtitle = track.artists[0].name;
    onClick = () => (window.location.href = track.external_urls.spotify);

    function playTrack() {
      if (audioFile.paused) {
        audioFile.play()
        const playing = true
        setPlaying(playing)
      } else {
        audioFile.pause()
        const playing = false
        setPlaying(playing)
      }
    }

    onClick = playTrack

  } else {
    imageUrl = track.images[0].url;
    title = track.name;
    subtitle = track.genres.slice(0, 2).join(" | ");
    onClick = () => (window.location.href = track.external_urls.spotify);
  }



  return (
    <div className="relative" onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div
        className={classNames(
          "song-listing-item",
          "song-listing-item",
          "song-listing-item-" + props.shade,
          props.isLastItem ? "last-item" : ""
        )}
      >
        <div
          className={classNames(
            "color-square",
            "square-light",
            "background-" + props.shade + "-shade-1"
          )}
        ></div>
        <div
          className={classNames(
            "color-square",
            "square-dark",
            "background-" + props.shade + "-shade-3"
          )}
        ></div>
        <img
          src={imageUrl}
          className="cover-photo cover-photo-back"
          alt="cover art"
        />
        <img
          src={imageUrl}
          className="cover-photo cover-photo-front"
          alt="cover art"
        />
        <div
          className={classNames(
            "song-title",
            "text-" + props.shade + "-shade-5"
          )}
        >
          {title}
        </div>
        <div
          className={classNames(
            "song-artist",
            "text-" + props.shade + "-shade-1"
          )}
        >
          {subtitle}
        </div>
        <div>
        {hovered && track.type === "track" && (!playing ? <div className="relative">
          <img src={playImg}/>
        </div> : <div className="relative">
          <img src={pauseImg}/>
        </div>)}
      </div>
      </div>
    </div>
  );
}

export default SongListItem;
