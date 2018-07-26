import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import CurrentHandMenu from './CurrentHandMenu';
import { playerColors, getCurrentTurn } from '../utils';

//this is each player's information on the sidebar
const PlayerMenu = ({ players, unusedCityCards, unusedEventCards, playerKey, currentTurn }) => {
  const player = players[playerKey];
  const name = player.active ? `${player.name}` : 'Inactive';
  return (
    <Menu
      vertical
      inverted
      fluid={true}
      tabular
    >
      <Menu.Item
        className="menu-player"
        style={{ background: currentTurn === +playerKey ? 'green' : 'black' }}
      >
        <Icon className="menu-player-icon" name="user" color={playerColors[player.role]} />
        {`${name} - ${player.role}`}
      </Menu.Item>
      <Menu.Item className="menu-player">
        {player.currentHand.map(cardRef => {
          const { name, color } = unusedCityCards[cardRef.id] ? unusedCityCards[cardRef.id] : unusedEventCards[cardRef.id];
          return (
            <CurrentHandMenu key={cardRef.id} name={name} color={color} />
          );
        })}
      </Menu.Item>
    </Menu>
  );
};

const mapStateToProps = (state) => {
  return {
    currentTurn: getCurrentTurn(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(PlayerMenu);
