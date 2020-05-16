import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import SongListItem from "src/components/SongListItem.js";

import "../css/song_list.css";
const debug = require("debug")("app:SongList");

function SongList(props) {
  debug(props.tracks);

  const longTermComps = props.tracks.long_term.map((track) => (
    <SongListItem track={track} />
  ));
  const mediumTermComps = props.tracks.medium_term.map((track) => (
    <SongListItem track={track} />
  ));
  const shortTermComps = props.tracks.short_term.map((track) => (
    <SongListItem track={track} />
  ));

  return (
    <>
      <div className="song-list-container">
        <div className="song-list-title">YOUR TOP SONGS</div>
        <div className="song-list">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row justify-center items-center bg-white">
              <div> Long Term </div>
              {longTermComps}
            </div>
            <div className="flex flex-row justify-center items-center bg-white">
              <div> Medium Term </div>
              {mediumTermComps}
            </div>
            <div className="flex flex-row justify-center items-center bg-white">
              <div> Short Term </div>
              {shortTermComps}
            </div>
          </div>
        </div>
      </div>
    </>
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
