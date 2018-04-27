import React from 'react';
import { Icon, Button } from 'semantic-ui-react';

const Cure = () => {
  return (
    <Button className="action-button cure-button">
      <Icon className="cure-icon action-icon" name="lab" size="big" />
      <div className="cure-text action-text">Cure</div>
    </Button>
  );
};

export default Cure;
