import React from 'react';
import { Button, Header, Icon, Modal, Image } from 'semantic-ui-react';

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
        <Modal.Content
          image
          style={{
            justifyContent: 'space-around'
          }}
        >
          {cards && cards.length &&
            <Button.Group widths={cards.length}>
              {cards.map(card => (
                <Button
                  active={this.state.active[card.id]}
                  value={card.id}
                  toggle
                  key={card.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                  onClick={event => {
                    const cardId = event.currentTarget.value;
                    this.setState(prevState => {
                      const selected = !prevState.active[cardId] ? [...prevState.selected, card] : prevState.selected.filter(card => card.id !== cardId);
                      const active = {...prevState.active, [cardId]: !prevState.active[cardId]};
                      return {
                        selected,
                        active
                      };
                    });
                  }}
                >
                  <div style={{ display: 'flex' }}>
                    <Image
                      wrapped
                      size='small'
                      src={`assets/images/${card.id}.png`}
                      style={{ width: 'auto' }}
                    />
                  </div>
                </Button>
              ))}
            </Button.Group>}
        </Modal.Content>
        <Modal.Actions>
          <Button
            color='red'
            inverted
            onClick={this.handleClose}
          >
            <Icon name='remove' /> Cancel
          </Button>
          <Button
            color='green'
            inverted
            onClick={() => {
              action(this.state.selected);
              this.handleClose();
            }}
          >
            <Icon name='checkmark' /> Select
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ChooseCardModal;
