import React, {Component} from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { cities } from './utils/cities';
import L from 'leaflet';

const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const basicTiles = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

let BallIcon = L.Icon.extend({
  options: {
      iconSize: [30, 30],
  }
});

let iconContainer = {
  redIcon: new BallIcon({iconUrl: 'https://lh5.ggpht.com/JUGn9I-kMM3LriNMpdUA6Z1_NZksTHCndCJ7SqSG0CkF6P-rBHUS91_aAiWfNpKSoQ=w300'}),
  blueIcon: new BallIcon({iconUrl: 'http://lobelpost.com/v17/files/stacks-image-12a7505.png'}),
  yellowIcon: new BallIcon({iconUrl: 'https://lh3.googleusercontent.com/nmIfOaurHcAvlxd6OksvTYkF1thhsEnpxV2x0PvJ8zTxS-uAX0r7BWQxM20XTL6SrQ'}),
  blackIcon: new BallIcon({iconUrl: 'https://totalsororitymove.com/wp-content/uploads/user_avatars/blackball.png'})
};

export default class Board extends Component {
  componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.on('zoomend', () => {
      window.console.log('Current zoom level -> ', leafletMap.getZoom());
    })
  }

  render() {
    const center = [0,0];
    const zoomLevel = 1;
    //let {redIcon, blueIcon, yellowIcon, blackIcon} = iconContainer;
    return (
      <div>
        <Map
          ref={m => {this.leafletMap = m;}}
          center={center}
          zoom={zoomLevel}
          minZoom={2}
          maxZoom={2}
          maxBounds={[[70,-100],[-60,120]]}
        >
          <TileLayer
            url={stamenTonerTiles}
          />
          {
            cities.map((city, index) => <Marker position={city.coords} key={index} icon={iconContainer[city.icon]}/>)
          }
        </Map>
      </div>
    );
  }
}
