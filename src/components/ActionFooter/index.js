import React from 'react';
import { Sidebar } from 'semantic-ui-react';
import Build from './Build';
import Cure from './Cure';
import Move from './Move';
import Treat from './Treat';
import Share from './Share';

const ActionFooter = () => {
  return (
    <Sidebar className="action-footer" direction="bottom" visible={true} width="very wide">
      <div className="action-container">
        <Move />
        <Build />
        <Share />
        <Treat />
        <Cure />
      </div>
    </Sidebar>
  );
};

export default ActionFooter;

export { default as Build } from './Build';
export { default as Cure } from './Cure';
export { default as Move } from './Move';
export { default as Treat } from './Treat';
export { default as Share } from './Share';
export { default as TreatButton } from './TreatButton';
export { default as TreatModal } from './TreatModal';
export { default as TreatModalContent } from './TreatModalContent';
export { default as DiseaseButton } from './DiseaseButton';
