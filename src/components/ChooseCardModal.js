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
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({ modalOpen: true });
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  render() {
    const { ModalTrigger, cards, action, disabled, clickable=true } = this.props;
    // handle trigger on Marker.
    const trigger = {...ModalTrigger};
    trigger.props = {...trigger.props, onClick: () => !disabled && clickable && this.handleOpen()};
    return (
      <Modal
        closeOnDimmerClick={true}
        closeOnEscape
        onClose={this.handleClose}
        trigger={<div className="choose-card-modal" onClick={() => !disabled && clickable && this.handleOpen()}>{trigger}</div>}
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
