import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import CurrentHandMenu from './CurrentHandMenu';

//this is each player's information on the sidebar
export default function PlayerMenu (props) {
  const { players, unusedCityCards, playerKey } = props;

  return (
    <Menu
      vertical
      inverted
      fluid={true}
      tabular
      >
        <Menu.Item className="menu-player">
          <Icon name="user outline" style={{display: 'inline', 'padding-right': '5px'}} />
          {`${players[playerKey].name} - ${players[playerKey].role}`}
        </Menu.Item>
        <Menu.Item style={{'font-size': '1.3em', 'font-family': 'fantasy'}}>
          {players[playerKey].currentHand.map(cardRef => {
            const {name, color} = unusedCityCards[cardRef.id];
            return (
              <CurrentHandMenu key={cardRef.id} name={name} color={color} />
            )
          })}
        </Menu.Item>
    </Menu>
  )
}

//style={{background: (players[playerKey].active) ? 'red' : 'black'}}
