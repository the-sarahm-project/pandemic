import React from 'react';
import { Button, Image } from 'semantic-ui-react';

const PlayerButton = ({ player, playerImage, setSelected }) => {
  return (
    <Button
      className="player-button"
      value={player.id}
      toggle
      style={{
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: '10px',
        flexShrink: 1,
        maxWidth: '33%',
        minWidth: '25%'
      }}
      onClick={event => setSelected(event.currentTarget.value)}
    >
      <div style={{ display: 'flex' }}>
        <Image
          wrapped
          size='small'
          src={playerImage[player.role]}
          style={{ width: 'auto' }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}
        >
          <div>Name</div>
          <div>{player.role}</div>
        </div>
      </div>
    </Button>
  );
};

export default PlayerButton;
