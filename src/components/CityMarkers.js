import React from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { ResearchStation } from './index';
import { doc } from './App';

const Icon = L.Icon.extend({
  options: {
    iconSize: [30, 30]
  }
});

const iconContainer = {
  redIcon: new Icon({ iconUrl: 'https://lh5.ggpht.com/JUGn9I-kMM3LriNMpdUA6Z1_NZksTHCndCJ7SqSG0CkF6P-rBHUS91_aAiWfNpKSoQ=w300' }),
  blueIcon: new Icon({ iconUrl: 'http://lobelpost.com/v17/files/stacks-image-12a7505.png' }),
  yellowIcon: new Icon({ iconUrl: 'https://lh3.googleusercontent.com/nmIfOaurHcAvlxd6OksvTYkF1thhsEnpxV2x0PvJ8zTxS-uAX0r7BWQxM20XTL6SrQ' }),
  blackIcon: new Icon({ iconUrl: 'https://totalsororitymove.com/wp-content/uploads/user_avatars/blackball.png' })
};

const CityMarkers = ({ cities }) => {
  return (
    isLoaded(cities) &&
    Object.keys(cities).map(city => (
      <div key={cities[city].coords}>
        <Marker position={cities[city].coords} icon={iconContainer[cities[city].icon]} />
        {cities[city].researchStation && <ResearchStation coords={cities[city].coords} />}
      </div>
    ))
  );
};

const mapStateToProps = (state) => {
  const game = state.firestore.data.games && state.firestore.data.games[doc];
  const cities = game && game.cities;
  return {
    cities
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(CityMarkers);

