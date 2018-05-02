import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { PlayerButton } from './index';

const ModalPlayerContent = ({ players, playerImage, setSelected }) => {
  return (
    <Modal.Content
      image
      style={{
        justifyContent: 'space-around'
      }}
    >
      {players && players.length &&
        <Button.Group widths={players.length}>
          {players.map(player => (
            <PlayerButton
              key={player[0]} //referring to playerId (number)
              player={player}
              playerImage={playerImage}
              setSelected={setSelected}
            />
          ))}
        </Button.Group>}
    </Modal.Content>
  );
};

export default ModalPlayerContent;
