import React from 'react';
import { Button, Image } from 'semantic-ui-react';

const CardButton = ({ card, active, setSelectedAndActive }) => {
  return (
    <Button
      className='card-button'
      active={active[card.id]}
      value={card.id}
      toggle
      style={{
        padding: '3px',
        flex: 'none',
        maxWidth: '20%',
        flexShrink: 1
      }}
      onClick={event => setSelectedAndActive(event.currentTarget.value, card)}
    >
      <Image
        wrapped
        size='small'
        src={`assets/images/${card.id}.png`}
        style={{ width: 'auto' }}
      />
    </Button>
  );
};

export default CardButton;
