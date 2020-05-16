import React from "react";

import PropTypes from "prop-types";
import SongListItem from "src/components/SongListItem.js";

import "../css/song_list.css";

function SongList(props) {
  return (<>
    <div className="song-list-container">
      <div className="song-list-title">YOUR TOP SONGS</div>
      <div className="song-list">
        <div><SongListItem trackInfo={props.tracks.long_term} shade="primary-1" ></SongListItem></div>
        <div><SongListItem trackInfo={props.tracks.medium_term} shade="secondary-1" ></SongListItem></div>
        <div><SongListItem trackInfo={props.tracks.short_term} shade="secondary-2" isLastItem={true}></SongListItem></div>
      </div>
    </div>
  </>);
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
