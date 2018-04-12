import React from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { cities } from '../utils/cities';
import { ResearchStation, CityLines, PlayerHand, GameHeader } from './index';

const darkTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const BallIcon = L.Icon.extend({
  options: {
    iconSize: [30, 30]
  }
});

const iconContainer = {
  redIcon: new BallIcon({ iconUrl: 'https://lh5.ggpht.com/JUGn9I-kMM3LriNMpdUA6Z1_NZksTHCndCJ7SqSG0CkF6P-rBHUS91_aAiWfNpKSoQ=w300' }),
  blueIcon: new BallIcon({ iconUrl: 'http://lobelpost.com/v17/files/stacks-image-12a7505.png' }),
  yellowIcon: new BallIcon({ iconUrl: 'https://lh3.googleusercontent.com/nmIfOaurHcAvlxd6OksvTYkF1thhsEnpxV2x0PvJ8zTxS-uAX0r7BWQxM20XTL6SrQ' }),
  blackIcon: new BallIcon({ iconUrl: 'https://totalsororitymove.com/wp-content/uploads/user_avatars/blackball.png' })
};

const Board = () => {
  const center = [0, 0];
  const zoomLevel = 2.3;
  const maxBounds = [[70, -100], [-60, 120]];
  const atlantaCoords = [36.7322, -96.0644];
  return (
    <Map
      center={center}
      zoom={zoomLevel}
      minZoom={zoomLevel}
      maxZoom={zoomLevel}
      maxBounds={maxBounds}
      className="map"
    >
      <GameHeader />
      <PlayerHand />
      <TileLayer
        url={darkTiles}
      />
      {
        cities.map((city) => <Marker position={city.coords} key={city.coords} icon={iconContainer[city.icon]} />)
      }
      <ResearchStation coords={atlantaCoords} />
      <CityLines />
    </Map>
  );
};

export default Board;
