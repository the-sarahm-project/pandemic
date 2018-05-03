import React from 'react';
import { Button, Image } from 'semantic-ui-react';

const PlayerButton = ({ player, playerImage, setSelected }) => {
  return (
    <Button
      value={player[0]}
      toggle
      style={{
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: '10px',
        flex: 'none',
        width: '33%'
      }}
      onClick={event => setSelected(event.currentTarget.value)}
    >
      <div style={{ display: 'flex' }}>
        <Image
          wrapped
          size='small'
          src={playerImage[player[1].role]} //referring to player data, because players comes from Object.entries. Array of [key, value]
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
          <div>{player[1].role}</div>
        </div>
      </div>
    </Button>
  );
};

export default PlayerButton;
