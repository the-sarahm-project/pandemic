import React from 'react';
import { Button, Header, Icon, Modal, Image } from 'semantic-ui-react';

class ChooseCardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        trigger={<div onClick={() => disabled && this.handleOpen()}>{ModalTrigger}</div>}
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
                  value={card[0]}
                  toggle
                  key={card.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    borderStyle: 'solid',
                    borderColor: 'black',
                    borderRadius: '10px'
                  }}
                  onClick={event => this.setState({ selected: event.currentTarget.value })}
                >
                  <div style={{ display: 'flex' }}>
                    <Image
                      wrapped
                      size='small'
                      src={`../../public/assets/${card.id}`}
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
