import React from 'react';
import { Header, Modal } from 'semantic-ui-react';
import { ModalActions, ModalPlayerContent } from './index';
import { playerImage } from '../utils';

class ChoosePlayerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      modalOpen: false
    };
    this.handleOpen = () => this.setState({ modalOpen: true });
    this.handleClose = () => this.setState({ modalOpen: false });
  }

  render() {
    const { ModalTrigger, players, action, disabled } = this.props;
    return (
      <Modal
        trigger={<div onClick={() => !disabled && this.handleOpen()}>{ModalTrigger}</div>}
        open={this.state.modalOpen}
      >
        <Header icon='users' content='Choose a Player' />
        <ModalPlayerContent
          players={players}
          playerImage={playerImage}
          setSelected={selected => this.setState({ selected })}
        />
        <ModalActions
          action={action}
          handleClose={this.handleClose}
          selected={this.state.selected}
        />
      </Modal>
    );
  }
}

export default ChoosePlayerModal;
