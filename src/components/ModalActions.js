import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';

const ModalActions = ({ action, handleClose, selected, cancelDisabled }) => {
  return (
    <Modal.Actions>
      <Button
        color='red'
        inverted
        onClick={handleClose}
        disabled={cancelDisabled}
      >
        <Icon name='remove' /> Cancel
      </Button>
      <Button
        color='green'
        inverted
        onClick={async () => {
          const completed = await action(selected);
          if (completed) handleClose();
        }}
      >
        <Icon name='checkmark' /> Select
      </Button>
    </Modal.Actions>
  );
};

export default ModalActions;
