import React from "react";
import classNames from "classnames";

import PropTypes from "prop-types";
import Cover from "../img/cover.jpg";

import "../css/song_list_item.css";

// className={classnames('pill', this.props.styleName)}
//  	  	<div className="song-listing-item song-listing-item-primary-1">

// TODO: handle when song titles are really long and overflow
function SongListItem(props) {
  let imageUrl, title, subtitle;
  const track = props.track;
  if (track.type === "track") {
    imageUrl = track.album.images[0].url;
    title = track.name;
    subtitle = track.artists[0].name;
  } else {
    imageUrl = track.images[0].url;
    title = track.name;
    subtitle = track.genres.slice(0, 2).join(" | ");
  }

  return (
    <>
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
      </div>
    </>
  );
}

export default SongListItem;
