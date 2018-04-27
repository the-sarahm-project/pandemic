import React from 'react';
import { Sidebar } from 'semantic-ui-react';
import { Move, Build, Share, Treat, Cure } from './index';

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
