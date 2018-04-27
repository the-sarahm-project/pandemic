import React from 'react';
import { Sidebar } from 'semantic-ui-react';
import { MoveContainer, BuildContainer, ShareContainer, TreatContainer, CureContainer } from './index';

const ActionFooter = () => {
  return (
    <Sidebar className="action-footer" direction="bottom" visible={true} width="very wide">
      <div className="action-container">
        <MoveContainer />
        <BuildContainer />
        <ShareContainer />
        <TreatContainer />
        <CureContainer />
      </div>
    </Sidebar>
  );
};

export default ActionFooter;
