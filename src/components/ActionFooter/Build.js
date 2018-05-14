import React from 'react';
import { Icon, Button } from 'semantic-ui-react';

const Build = () => {
  return (
    <Button className="action-button build-button">
      <Icon className="build-icon action-icon" name="building" size="big" />
      <div className="build-text action-text">Build</div>
    </Button>
  );
};

export default Build;
