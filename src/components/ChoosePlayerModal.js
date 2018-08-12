import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Header, Modal, Button, Icon } from 'semantic-ui-react';
import { ModalActions, ModalPlayerContent, ChooseCardModal} from './index';
import { playerImage, getSelf } from '../utils';

class ChoosePlayerModal extends React.Component {
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
    const { ModalTrigger, players, action, disabled, clickable, self } = this.props;
    const player = players.find(player => player.id === +this.state.selected) || {};
    const currentCityCard = self.currentHand.find(card => card.id === self.currentCity) || [];
    const currentHand = player.role === 'Researcher' ? player.currentHand.concat(currentCityCard) : self.currentHand;
    let onClick;
    if (!disabled && clickable) {
      onClick = this.handleOpen;
    } else if (!disabled) {
      onClick = () => alert('Not your turn, or discard cards');
    } else {
      onClick = () => {};
    }
    return (
      <Modal
        closeOnDimmerClick
        closeOnEscape
        onClose={this.handleClose}
        trigger={<div onClick={onClick}>{ModalTrigger}</div>}
        open={this.state.modalOpen}
      >
        <Header icon='users' content='Choose a Player' />
        <ModalPlayerContent
          players={players}
          playerImage={playerImage}
          setSelected={selected => this.setState({ selected })}
          selected={this.state.selected}
        />
        {(self.role === 'Researcher' || player.role === 'Researcher') ?
        <Modal.Actions>
          <Button
            color='red'
            inverted
            onClick={this.handleClose}
          >
            <Icon name='remove' /> Cancel
          </Button>
          <ChooseCardModal
            cards={currentHand}
            action={action.bind(action.this, this.state.selected)}
            playerId={this.state.selected}
            handleClose={this.handleClose}
            ModalTrigger={
              <Button
                color='green'
                inverted
                disabled={!currentHand.length}
              >
                <Icon name='checkmark' /> Select
              </Button>
            }
          />
        </Modal.Actions> :
        <Modal.Actions>
          <ModalActions
            action={action}
            handleClose={this.handleClose}
            selected={this.state.selected}
          />
        </Modal.Actions>}
      </Modal>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    self: getSelf(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(ChoosePlayerModal);
