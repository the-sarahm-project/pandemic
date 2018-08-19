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
      modalOpen: false,
      city: ''
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen(event) {
    this.setState({ city: event.target.options.id, modalOpen: true });
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  render() {
    const { ModalTrigger, cards, action, disabled, clickable=true, header, closeOnDimmerClick=true, closeOnEscape=true, cancelDisabled, actionsRemaining } = this.props;
    let trigger;
    // handle trigger on Marker.
    if (ModalTrigger) {
      trigger = {...ModalTrigger};
      trigger.props = {...trigger.props, onClick: (event) => !disabled && clickable && this.handleOpen(event)};
    }
    let onClick;
    if (!disabled && clickable && actionsRemaining) {
      onClick = (event) => this.handleOpen(event);
    } else if (!disabled && actionsRemaining) {
      onClick = () => alert('Not your turn, or discard cards');
    } else {
      onClick = () => {};
    }
    return (
      <Modal
        closeOnDimmerClick={closeOnDimmerClick}
        closeOnEscape={closeOnEscape}
        onClose={this.handleClose}
        trigger={trigger && <div className="choose-card-modal" onClick={onClick}>{trigger}</div>}
        open={this.state.modalOpen}
      >
        <Header icon='users' content={header || 'Choose Cards'} />
        <ModalCardContent
          cards={cards}
          active={this.state.active}
          setSelectedAndActive={setSelectedAndActive.bind(this)}
        />
        <Modal.Actions>
          <ModalActions
            action={action}
            handleClose={this.props.handleClose || this.handleClose}
            selected={this.state.selected}
            cancelDisabled={cancelDisabled}
            city={this.state.city}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ChooseCardModal;
