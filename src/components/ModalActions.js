import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';

//this is each player's information on the sidebar
const ModalActions = ({ action, handleClose, selected }) => {
  return (
    <Modal.Actions>
      <Button
        color='red'
        inverted
        onClick={handleClose}
      >
        <Icon name='remove' /> Cancel
      </Button>
      <Button
        color='green'
        inverted
        onClick={() => {
          action(selected);
          handleClose();
        }}
      >
        <Icon name='checkmark' /> Select
      </Button>
    </Modal.Actions>
  );
};

export default ModalActions;
