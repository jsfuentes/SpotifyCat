import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import SongListItem from "src/components/SongListItem.js";

import "../css/song_list.css";
const debug = require("debug")("app:SongList");

function SongList(props) {
  debug(props.tracks);

  const listItems = props.tracks.map((track) => <SongListItem track={track} />);

  return (
    <div className="w-full overflow-x-auto">
      <div className="song-list-title">{props.title}</div>
      <div className="song-list">
        <div className="flex flex-row justify-center items-center bg-white">
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
