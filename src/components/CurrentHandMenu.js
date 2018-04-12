import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

//this is each item in the current hand on the sidebar
export default function CurrentHandMenu(props) {
  let {name, color} = props;
  color = color === 'black' ? 'grey' : color;
  return (
    <div>
    <Menu.Item style={{'text-align': 'left', 'padding-left': '0'}}>
      <Icon name="square" color={color} style={{display: 'inline', 'padding-right': '5px'}} />
        {name}
    </Menu.Item>
    </div>
  )
}
