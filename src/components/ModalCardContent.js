import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { CardButton } from './index';

//this is each player's information on the sidebar
const ModalCardContent = ({ cards, active, setSelectedAndActive }) => {
  return (
    <Modal.Content
      image
      style={{
        justifyContent: 'space-around'
      }}
    >
      {cards && cards.length &&
        <Button.Group widths={cards.length}>
          {cards.map(card => (
            <CardButton
              key={card.id}
              card={card}
              active={active}
              setSelectedAndActive={setSelectedAndActive}
            />
          ))}
        </Button.Group>}
    </Modal.Content>
  );
};

export default ModalCardContent;
