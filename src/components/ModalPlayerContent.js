import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { PlayerButton } from './index';

const ModalPlayerContent = ({ players, playerImage, setSelected }) => {
  return (
    <Modal.Content>
      {players && players.length &&
        <Button.Group
          className="player-button-group"
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {players.map(player => (
            <PlayerButton
              key={player[0]} //referring to playerId (number), because players comes from Object.entries. Array of [key, value]
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
