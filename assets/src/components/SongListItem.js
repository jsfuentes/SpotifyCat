import React from "react";
import classNames from 'classnames';

import PropTypes from "prop-types";
import Cover from "../img/cover.jpg";

import "../css/song_list_item.css";

// className={classnames('pill', this.props.styleName)}
//  	  	<div className="song-listing-item song-listing-item-primary-1">

// TODO: handle when song titles are really long and overflow
function SongListItem(props) {
  return (<>
  	<div className={classNames('song-listing-item', "song-listing-item", "song-listing-item-" + props.shade, props.isLastItem ? "last-item" : "")}>
  		<div className={classNames("color-square", "square-light", "background-" + props.shade + "-shade-1")}></div>
  		<div className={classNames("color-square", "square-dark", "background-" + props.shade + "-shade-3")}></div>
  		<img src={props.trackInfo[0].album.images[0].url} className="cover-photo cover-photo-back" alt="cover art" />
  		<img src={props.trackInfo[0].album.images[0].url} className="cover-photo cover-photo-front" alt="cover art" />
  		<div className={classNames("song-title", "text-" + props.shade + "-shade-5")}>{props.trackInfo[0].name}</div>
  		<div className={classNames("song-artist", "text-" + props.shade + "-shade-1")}>{props.trackInfo[0].artists[0].name}</div>
  	</div>

  </>);
}

export default SongListItem;
