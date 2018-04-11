import React from 'react';
import { Sidebar, Icon } from 'semantic-ui-react';

const ActionFooter = () => {
  return (
    <Sidebar className="action-footer" direction="bottom" visible={true} width="very wide">
      <div className="action-container">
        <div className="move">
          <Icon name="car" size="big" />/
          <Icon name="plane" size="big" />
        </div>
        <div className="build">
          <Icon name="building" size="big" />
        </div>
        <div className="share">
          <Icon name="gift" size="big" />
        </div>
        <div className="treat">
          <Icon name="medkit" size="big" />
        </div>
        <div className="cure">
          <Icon name="lab" size="big" />
        </div>
      </div>
    </Sidebar>
  );
};

export default ActionFooter;
