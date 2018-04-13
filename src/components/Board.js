import React from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Container } from 'semantic-ui-react';
import { cities } from '../utils/cards';
import { ResearchStation, CityLines, Card } from './index';
import path from 'path';

const darkTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const Icon = L.Icon.extend({
  options: {
    iconSize: [30, 30]
  }
});

const PlayerIcon = L.Icon.extend({
  options: {
    iconSize: [50, 50]
  }
});

const iconContainer = {
  redIcon: new Icon({ iconUrl: 'https://lh5.ggpht.com/JUGn9I-kMM3LriNMpdUA6Z1_NZksTHCndCJ7SqSG0CkF6P-rBHUS91_aAiWfNpKSoQ=w300' }),
  blueIcon: new Icon({ iconUrl: 'http://lobelpost.com/v17/files/stacks-image-12a7505.png' }),
  yellowIcon: new Icon({ iconUrl: 'https://lh3.googleusercontent.com/nmIfOaurHcAvlxd6OksvTYkF1thhsEnpxV2x0PvJ8zTxS-uAX0r7BWQxM20XTL6SrQ' }),
  blackIcon: new Icon({ iconUrl: 'https://totalsororitymove.com/wp-content/uploads/user_avatars/blackball.png' })
};

const playerIconContainer = {
  'Contingency Planner': new PlayerIcon({iconUrl: 'assets/images/cont_planner.png'}),
  Dispatcher: new PlayerIcon({iconUrl: 'assets/images/dispatcher.png'}),
  Medic: new PlayerIcon({iconUrl: 'assets/images/medic.png'}),
  'Operations Expert': new PlayerIcon({iconUrl: 'assets/images/ops_expert.png'}),
  'Quarantine Specialist': new PlayerIcon({iconUrl: 'assets/images/quar_spec.png'}),
  Researcher: new PlayerIcon({iconUrl: 'assets/images/researcher.png'}),
  Scientist: new PlayerIcon({iconUrl: 'assets/images/scientist.png'}),
}

const Board = (props) => {
  let game, player, currentHand, eventCards, players = {};
  if (props.game) {
    game = props.game.ytQnw2I0gonsoYXo6M02;
    eventCards = game.unusedEventCards;
    player = game.players[1];
    currentHand = player.currentHand;
    players = game.players;
  }
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
      <Container className="cards-container">
        {
          props.game && currentHand.map(cardRef => {
            return <Card key={cardRef.id} cardRef={cardRef} eventCards={eventCards} />;
          })
        }
      </Container>
      <TileLayer
        url={darkTiles}
      />
      {
        Object.keys(players).map(playerKey => {
          const [latitude, longitude] = cities[players[playerKey].currentCity].coords;
          return (<Marker
                    position={[latitude + 3, longitude]}
                    key={playerKey}
                    icon={playerIconContainer[players[playerKey].role]}
                    zIndexOffset={1000}
                  />)
        })
      }
      {
        Object.keys(cities).map(city => <Marker position={cities[city].coords} key={cities[city].coords} icon={iconContainer[cities[city].icon]} />)
      }
      <ResearchStation coords={atlantaCoords} />
      <CityLines />
    </Map>
  );
};

const mapStateToProps = (state) => ({
  game: state.firestore.data.games,
});

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Board);
