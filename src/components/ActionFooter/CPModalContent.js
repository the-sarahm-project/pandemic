import React from 'react';
import { ModalContent, ButtonGroup } from 'semantic-ui-react';
import CardButton from '../CardButton';

const CPModalContent = ({ eventCards, setSelected, selected }) => {
  return (
    <ModalContent>
      {eventCards && eventCards.length &&
        <ButtonGroup
          className="disease-button-group"
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {eventCards.map(card => {
            const active = card.id === selected;
            return (
              <CardButton
                key={card.id}
                card={card}
                active={{[card.id]: active}}
                setSelectedAndActive={setSelected}
              />
            );
          })}
        </ButtonGroup>}
    </ModalContent>
  );
};

export default CPModalContent;
