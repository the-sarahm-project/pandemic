import React from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { cities } from '../utils/cities';
import L from 'leaflet';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

const darkTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const lightTiles = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const BallIcon = L.Icon.extend({
  options: {
      iconSize: [30, 30],
  }
});
const iconContainer = {
  redIcon: new BallIcon({iconUrl: 'https://lh5.ggpht.com/JUGn9I-kMM3LriNMpdUA6Z1_NZksTHCndCJ7SqSG0CkF6P-rBHUS91_aAiWfNpKSoQ=w300'}),
  blueIcon: new BallIcon({iconUrl: 'http://lobelpost.com/v17/files/stacks-image-12a7505.png'}),
  yellowIcon: new BallIcon({iconUrl: 'https://lh3.googleusercontent.com/nmIfOaurHcAvlxd6OksvTYkF1thhsEnpxV2x0PvJ8zTxS-uAX0r7BWQxM20XTL6SrQ'}),
  blackIcon: new BallIcon({iconUrl: 'https://totalsororitymove.com/wp-content/uploads/user_avatars/blackball.png'})
};

const Board = (props) => {
  const center = [0,0];
  const zoomLevel = 1;
  const maxBounds = [[70,-100],[-60,120]];
  //console.log('these are cities', props)
  return (
    <div>
      <Map
        ref={m => {this.leafletMap = m;}}
        center={center}
        zoom={zoomLevel}
        minZoom={2}
        maxZoom={2}
        maxBounds={maxBounds}
      >
        <TileLayer
          url={darkTiles}
        />
        {
          cities.map((city, index) => <Marker position={city.coords} key={index} icon={iconContainer[city.icon]}/>)
        }
      </Map>
    </div>
  );
}

//export default Board;

const mapStateToProps = (state) => ({
  cities: state.firestore.cities //I want to add cities to my store. Does it go in the 'order' object?
})

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Board);
