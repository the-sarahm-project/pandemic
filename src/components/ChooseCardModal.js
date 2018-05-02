import React from 'react';
import { ModalCardContent, ModalActions } from './index';
import { Header, Modal } from 'semantic-ui-react';
import { setSelectedAndActive } from '../utils';

class ChooseCardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: {},
      selected: [],
      modalOpen: false
    };
    this.handleOpen = () => this.setState({ modalOpen: true });
    this.handleClose = () => this.setState({ modalOpen: false });
  }

  render() {
    const { ModalTrigger, cards, action, disabled } = this.props;
    return (
      <Modal
        trigger={<div onClick={() => !disabled && this.handleOpen()}>{ModalTrigger}</div>}
        open={this.state.modalOpen}
      >
        <Header icon='users' content='Choose Cards' />
        <ModalCardContent
          cards={cards}
          active={this.state.active}
          setSelectedAndActive={setSelectedAndActive.bind(this)}
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

export default ChooseCardModal;
