import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Header, Modal, Icon, Button } from 'semantic-ui-react';
import { ModalActions } from '../index';
import CPModalContent from './CPModalContent';
import { getCurrentTurn, getActionsRemaining, tooManyCards, getSelf, getTrashedPlayerCards, isCurrentTurn, updateContingencyCard, getNextTurn, getTrashedEventCards } from '../../utils';

export class CPModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      modalOpen: false
    };
    this.handleOpen = () => this.setState({ modalOpen: true });
    this.handleClose = () => this.setState({ modalOpen: false });
  }

  render() {
    const { actionsRemaining, currentTurn, self, trashedPlayerCards, nextTurn, tooManyCards } = this.props;
    const trashedEventCards = getTrashedEventCards(trashedPlayerCards);
    const disabled = self.cpEventCard ? false : !isCurrentTurn(currentTurn) || !actionsRemaining || tooManyCards || !trashedEventCards.length;
    return (
      <Modal
        trigger={
          <Button
            className="action-button cpaction-button"
            disabled={disabled}
            onClick={this.handleOpen}
          >
            <Icon className="bell-icon action-icon" name="bell" size="large" />
            <div className="cpaction-text action-text">CPAction</div>
          </Button>
        }
        open={this.state.modalOpen}
      >
        <Header icon='users' content='Choose an Event Card' />
        <CPModalContent
          eventCards={trashedEventCards}
          setSelected={selected => this.setState({ selected: selected.id })}
          selected={this.state.selected}
        />
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <ModalActions
            action={updateContingencyCard.bind(this, self, actionsRemaining, nextTurn)}
            handleClose={this.handleClose}
            selected={this.state.selected}
          />
        </div>
      </Modal>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    actionsRemaining: getActionsRemaining(state),
    currentTurn: getCurrentTurn(state),
    tooManyCards: tooManyCards(state),
    self: getSelf(state),
    trashedPlayerCards: getTrashedPlayerCards(state),
    nextTurn: getNextTurn(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(CPModal);
