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

  // componentDidUpdate(prevProps) {
  //   console.log(prevProps);
  //   console.log(this.props);
  //   if (prevProps.ModalTrigger !== this.props.ModalTrigger) {
  //     if (!this.props.ModalTrigger) {
  //       this.handleOpen();
  //     }
  //   }
  // }

  handleOpen() {
    this.setState({ modalOpen: true });
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  render() {
    const { ModalTrigger, cards, action, disabled, clickable=true, header, closeOnDimmerClick=true, closeOnEscape=true, cancelDisabled } = this.props;
    let trigger;
    // handle trigger on Marker.
    if (ModalTrigger) {
      trigger = {...ModalTrigger};
      trigger.props = {...trigger.props, onClick: () => !disabled && clickable && this.handleOpen()};
    }
    return (
      <Modal
        closeOnDimmerClick={closeOnDimmerClick}
        closeOnEscape={closeOnEscape}
        onClose={this.handleClose}
        trigger={trigger && <div className="choose-card-modal" onClick={() => !disabled && clickable ? this.handleOpen() : alert('Not your turn, or discard cards')}>{trigger}</div>}
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
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ChooseCardModal;
