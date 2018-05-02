import React from 'react';
import { Button, Image } from 'semantic-ui-react';

const CardButton = ({ card, active, setSelectedAndActive }) => {
  return (
    <Button
      active={active[card.id]}
      value={card.id}
      toggle
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
      onClick={event => setSelectedAndActive(event.currentTarget.value, card)}
    >
      <div style={{ display: 'flex' }}>
        <Image
          wrapped
          size='small'
          src={`assets/images/${card.id}.png`}
          style={{ width: 'auto' }}
        />
      </div>
    </Button>
  );
};

export default CardButton;
