import React from 'react';
import { Image, Container, Modal, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getOwnHand, getGame, getGameRef } from '../utils';
import { eventAction } from '../utils/componentUtils/playerHand';
import ModalCardContent from './ModalCardContent';
import ModalActions from './ModalActions';

export class PlayerHand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalCards: [],
      modalOpen: false,
      selected: null,
      action: null,
      cpaction: false
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ modalCards: [], selected: '', action: null, modalOpen: false, cpaction: false });
  }

  async componentDidUpdate() {
    if (this.props.game.resilientPopulationModal) {
      const gameRef = await getGameRef();
      await gameRef.update({ resilientPopulationModal: false });
      await eventAction.call(this, 'ResilientPopulation');
    }
  }

  render() {
    const { playerHand } = this.props;
    const { modalCards, modalOpen, action, selected, cpaction } = this.state;
    return (
      <div className='ui container cards-container'>
        {this.state.modalCards.length &&
          <Modal
            open={modalOpen}
            onClose={this.handleClose}
          >
            <Header icon='browser' content='Cookies policy' />
            <ModalCardContent
              cards={modalCards}
              active={{[selected && selected.id]: true}}
              setSelectedAndActive={selected => this.setState({ selected })}
            />
            <Modal.Actions>
              <ModalActions
                action={action}
                handleClose={this.handleClose}
                selected={selected}
                cpaction={cpaction}
              />
            </Modal.Actions>
          </Modal>
        }
        <Container className="cards-container">
        {
          playerHand.map(cardRef => {
            const playerCard = cardRef.id;
            const src = `assets/images/${playerCard}.png`;
            return <Image id={playerCard} onClick={event => eventAction.call(this, event.target.id)} key={playerCard} className="hand-card" src={src} size="small" />;
          })
        }
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playerHand: getOwnHand(state),
    game: getGame(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(PlayerHand);
