import React from 'react';
import { Sidebar, Icon, Button } from 'semantic-ui-react';

const ActionFooter = () => {
  return (
    <Sidebar className="action-footer" direction="bottom" visible={true} width="very wide">
      <div className="action-container">
        <Button className="action-button move-button">
          <div className="move-icons">
            <Icon className="car-icon action-icon" name="car" size="big" />/
            <Icon className="plane-icon action-icon" name="plane" size="big" />
          </div>
          <div className="move-text action-text">Move</div>
        </Button>
        <Button className="action-button build-button">
          <Icon className="building-icon action-icon" name="building" size="big" />
          <div className="build-text action-text">Build</div>
        </Button>
        <Button className="action-button share-button">
          <Icon className="share-icon action-icon" name="gift" size="big" />
          <div className="share-text action-text">Share</div>
        </Button>
        <Button className="action-button treat-button">
          <Icon className="treat-icon action-icon" name="medkit" size="big" />
          <div className="treat-text action-text">Treat</div>
        </Button>
        <Button className="action-button cure-button">
          <Icon className="cure-icon action-icon" name="lab" size="big" />
          <div className="cure-text action-text">Cure</div>
        </Button>
      </div>
    </Sidebar>
  );
};

export default ActionFooter;
