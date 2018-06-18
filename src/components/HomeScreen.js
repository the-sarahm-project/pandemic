import React from 'react';
import { Segment } from 'semantic-ui-react';
import { CreateGame } from './index';

const HomeScreen = () => {
  return (
    <Segment
      raised
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90vh',
        height: '50vh'
      }}
    >
      <div
        style={{
          fontSize: '3em',
          marginBottom: '1em'
        }}
      >
        Pandemic
      </div>
      <CreateGame />
    </Segment>
  );
};

export default HomeScreen;
