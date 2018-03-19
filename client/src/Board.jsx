import React, {Component} from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { cities } from './utils/cities';

const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const basicTiles = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

export default class Board extends Component {
  componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    console.log('yay,', leafletMap)
    leafletMap.on('zoomend', () => {
      window.console.log('Current zoom level -> ', leafletMap.getZoom());
    })
  }

  render() {
    const center = [0,0];
    const zoomLevel = 1;
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
            url={basicTiles}
          />
          <Marker position={[0,0]} />
          {
            cities.map((city, index) => <Marker position={city.coords} key={index}/>)
          }
        </Map>
      </div>
    );
  }
}
