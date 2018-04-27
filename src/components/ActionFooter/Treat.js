import React from 'react';
import { Icon, Button } from 'semantic-ui-react';

const Treat = () => {
  return (
    <Button className="action-button treat-button" >
      <Icon className="treat-icon action-icon" name="medkit" size="big" />
      <div className="treat-text action-text">Treat</div>
    </Button>
  );
};

export default Treat;
