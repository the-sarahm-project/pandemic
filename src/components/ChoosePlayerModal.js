import React from 'react';
import { Button, Header, Icon, Modal, Image } from 'semantic-ui-react';

const playerImage = {
  'Contingency Planner': 'assets/images/cont_planner.png',
  Dispatcher: 'assets/images/dispatcher.png',
  Medic: 'assets/images/medic.png',
  'Operations Expert': 'assets/images/ops_expert.png',
  'Quarantine Specialist': 'assets/images/quar_spec.png',
  Researcher: 'assets/images/researcher.png',
  Scientist: 'assets/images/scientist.png'
};

class ChoosePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      modalOpen: false
    };
    this.handleOpen = () => this.setState({ modalOpen: true });
    this.handleClose = () => this.setState({ modalOpen: false });
  }

  render() {
    const { NewButton, players, action } = this.props;
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>{NewButton}</Button>}
        open={this.state.modalOpen}
      >
        <Header icon='users' content='Choose a Player' />
        <Modal.Content
          image
          style={{
            justifyContent: 'space-around'
          }}
        >
          {players && players.length &&
            <Button.Group widths={players.length}>
              {players.map(player => (
                <Button
                  value={player[0]}
                  toggle
                  key={player[0]}
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
                      src={playerImage[player[1].role]}
                      style={{ width: 'auto' }}
                    />
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                      }}
                    >
                      <div>Name</div>
                      <div>{player[1].role}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </Button.Group>}
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' inverted onClick={this.handleClose}>
            <Icon name='remove' /> Cancel
          </Button>
          <Button color='green' inverted onClick={() => action(this.state.selected)}>
            <Icon name='checkmark' /> Select
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ChoosePlayer;
