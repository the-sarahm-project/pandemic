import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

//this is each item in the current hand on the sidebar
export default function CurrentHandMenu(props) {
  let {name, color} = props;
  color = (color === 'black') ? 'grey' : color;
  return (
    <div>
      <Menu.Item className="menu-player-hand">
        <Icon className="menu-player-hand-icon" name={color ? 'square' : 'content'} color={color || 'olive'} />
          {name}
      </Menu.Item>
    </div>
  )
}
