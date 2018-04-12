import React from 'react';
import { Container, Image } from 'semantic-ui-react';

const GameHeader = () => {
  return (
    <Container className="game-header">
      <Image className="game-header" src="/assets/images/player_card.png" size="small" />
      <Image src="/assets/images/player_card.png" size="small" />
      <Image src="/assets/images/player_card.png" size="small" />
      <Image src="/assets/images/player_card.png" size="small" />
      <Image src="/assets/images/player_card.png" size="small" />
      <Image src="/assets/images/player_card.png" size="small" />
      <Image src="/assets/images/player_card.png" size="small" />
    </Container>
  );
};

export default GameHeader;
