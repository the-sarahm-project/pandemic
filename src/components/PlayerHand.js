import React from 'react';
import { Image, Container, Modal, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getOwnHand } from '../utils';
import { eventAction } from '../utils/componentUtils/playerHand';
import ModalCardContent from './ModalCardContent';
import ModalActions from './ModalActions';


class PlayerHand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalCards: [],
      modalOpen: false,
      selected: null,
      action: null
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ modalCards: [], selected: '', action: null, modalOpen: false });
  }

  render() {
    const { playerHand } = this.props;
    const { modalCards, modalOpen, action, selected } = this.state;
    return (
      <div>
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
    playerHand: getOwnHand(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(PlayerHand);
