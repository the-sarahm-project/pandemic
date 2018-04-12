import React from 'react';
import { Image } from 'semantic-ui-react';

const Card = (props) => {
  const playerCard = props.cardRef.id;
  const eventCards = props.eventCards;
  const src = eventCards && eventCards[playerCard] ? `assets/eventCards/${playerCard}.png` : `assets/cityCards/${playerCard}.png`;
  return (
    <Image className="hand-card" src={src} size='small' />
  );
};

export default Card;
