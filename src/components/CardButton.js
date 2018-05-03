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
        display: 'flex',
        justifyContent: 'center',
        flex: 'none',
        width: '20%'
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
