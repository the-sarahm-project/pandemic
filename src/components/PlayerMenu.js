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
        <Menu.Item style={{background: (players[playerKey].active) ? 'red' : 'black', 'font-size': '1.3em', 'font-family': 'fantasy', 'text-align': 'left'}}>
          <Icon name="user outline" style={{display: 'inline', 'padding-right': '5px'}} />
          {`${players[playerKey].name} - ${players[playerKey].role}`}
        </Menu.Item>
        <Menu.Item style={{'font-size': '1.3em', 'font-family': 'fantasy'}}>
          {players[playerKey].currentHand.map(cardRef => {
            const {name, color} = unusedCityCards[cardRef.split(' ').slice(-1)[0]];
            return (
              <CurrentHandMenu key={cardRef} name={name} color={color} />
            )
          })}
        </Menu.Item>
    </Menu>
  )
}
