import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { CardButton } from './index';

const ModalCardContent = ({ cards, active, setSelectedAndActive }) => {
  return (
    <Modal.Content>
      {cards && cards.length &&
        <Button.Group
          className="card-button-group"
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
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
