import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import CurrentHandMenu from './CurrentHandMenu';

const playerColors = {
  'Contingency Planner': 'teal',
  Dispatcher: 'purple',
  Medic: 'orange',
  'Operations Expert': 'olive',
  'Quarantine Specialist': 'green',
  Researcher: 'brown',
  Scientist: 'grey',
}

//this is each player's information on the sidebar
export default function PlayerMenu (props) {
  const { players, unusedCityCards, unusedEventCards, playerKey } = props;

  return (
    <Menu
      vertical
      inverted
      fluid={true}
      tabular
    >
      <Menu.Item
        className="menu-player"
        style={{background: (players[playerKey].active) ? 'red' : 'black'}}
      >
        <Icon className="menu-player-icon" name="user" color={playerColors[players[playerKey].role]} />
        {`${players[playerKey].name} - ${players[playerKey].role}`}
      </Menu.Item>
      <Menu.Item className="menu-player">
        {players[playerKey].currentHand.map(cardRef => {
          const {name, color} = unusedCityCards[cardRef.id] ? unusedCityCards[cardRef.id] : unusedEventCards[cardRef.id];
          return (
            <CurrentHandMenu key={cardRef.id} name={name} color={color} />
          )
        })}
      </Menu.Item>
    </Menu>
  )
}
