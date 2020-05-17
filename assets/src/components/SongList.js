import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import SongListItem from "src/components/SongListItem.js";

import "../css/song_list.css";
const debug = require("debug")("app:SongList");

function getLoopingIndex(lst, i) {
  if (i >= lst.length) {
    return 0;
  }
  return i;
}

function SongList(props) {
  debug(props.tracks);

  const shades = ["primary-1", "secondary-1", "secondary-2", "secondary-3"];
  let prev = -1;

  function getShade() {
    let i = Math.floor(Math.random() * shades.length);
    if (i == prev) {
      prev = getLoopingIndex(shades, i+1);
      console.log("returning " + prev + " with i " + i);
      return shades[prev]
    } else {
      prev = i;
      console.log("Returning " + prev);
      return shades[i]
    }
    
  }

  const listItems = props.tracks.map((track) => (
    <SongListItem
      key={track.id}
      track={track}
      shade={getShade()}
    />
  ));

  return (
    <div className="w-full my-7">
      <div className="song-list-title">{props.title}</div>
      <div className="song-list overflow-x-auto w-full">
        <div className="flex flex-row justify-center items-center">
          {listItems}
        </div>
      </div>
    </div>
  );
}

// className={classnames('pill', this.props.styleName)}

//   render() {
//     const greeting = 'Welcome to React';

//     return (
//       <div>
//         <Greeting greeting={greeting} />
//       </div>
//     );
//   }
// }

// class Greeting extends Component {
//   render() {
//     return <h1>{this.props.greeting}</h1>;
//   }
// }

export default SongList;
