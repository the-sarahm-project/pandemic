import React from 'react';
import { Container, Image } from 'semantic-ui-react';

const GameHeader = () => {
  return (
    <Container className="game-header">
      <Container className="game-header-container">
        <Image src="/assets/images/player_card.png" size="mini" /><div>53</div>
        <Image src="/assets/images/cube_blue.png" size="mini" /><div>20</div>
        <Image src="/assets/images/cube_yellow.png" size="mini" /><div>20</div>
        <Image src="/assets/images/cube_black.png" size="mini" /><div>20</div>
        <Image src="/assets/images/cube_red.png" size="mini" /><div>20</div>
        <Image src="/assets/images/station.png" size="mini" /><div>10</div>
        <Image src="/assets/images/infection_rate.png" size="mini" /><div>10</div>
        <Image src="/assets/images/outbreaks.png" size="mini" /><div>10</div>
      </Container>
    </Container>
  );
};

export default GameHeader;
