import React from 'react';
import { Button, Segment } from 'semantic-ui-react';

const CreateGame = () => {
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
      <Button>Create Game</Button>
    </Segment>

  );
};

export default CreateGame;
