import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import CurrentHandMenu from './CurrentHandMenu';
import { playerColors, getCurrentTurn, getSelf } from '../utils';

//this is each player's information on the sidebar
const PlayerMenu = ({ players, unusedCityCards, unusedEventCards, playerKey, currentTurn, self }) => {
  const player = players[playerKey];
  const roleColor = player.active ? 'white' : 'red';
  return (
    <Menu
      vertical
      inverted
      fluid={true}
      tabular
    >
      <Menu.Item style={{ background: 'black' }} className="menu-player">
        <div style={{ color: roleColor }}>
          {!player.active && <span>Inactive - </span>}
          <span style={{ textDecoration: 'underline' }}>{player.role}</span>
          {+currentTurn === player.id &&
            <span style={{ position: 'absolute', marginTop: '-.3em' }}>
              <Icon size="small" color="yellow" name="star" />
            </span>}
        </div>
        <Icon className="menu-player-icon" name="user" color={playerColors[player.role]} />
        <span style={{ color: 'white' }}>{player.name}</span>
      </Menu.Item>
      <Menu.Item className="menu-player">
        {player.currentHand.map(cardRef => {
          const { name, color } = unusedCityCards[cardRef.id] ? unusedCityCards[cardRef.id] : unusedEventCards[cardRef.id];
          return (
            <CurrentHandMenu key={cardRef.id} name={name} color={color} />
          );
        })}
        {self.cpEventCard && <CurrentHandMenu key={self.cpEventCard} name={self.cpEventCard} color='orange' />}
      </Menu.Item>
    </Menu>
  );
};

const mapStateToProps = (state) => {
  return {
    currentTurn: getCurrentTurn(state),
    self: getSelf(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(PlayerMenu);
