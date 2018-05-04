import React from 'react';
import { Item as MenuItem, Icon } from 'semantic-ui-react';

//this is each item in the current hand on the sidebar
const CurrentHandMenu = ({ name, color }) => {
  color = (color === 'black') ? 'grey' : color;
  return (
    <div>
      <MenuItem className="menu-player-hand">
        <Icon className="menu-player-hand-icon" name={color ? 'square' : 'content'} color={color || 'olive'} />
          {name}
      </MenuItem>
    </div>
  );
};

export default CurrentHandMenu;
