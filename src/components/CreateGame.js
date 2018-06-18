import React from 'react';
import { Header, Modal, Button } from 'semantic-ui-react';
import { CreateGameForm } from './index';
class CreateGame extends React.Component {
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
    return (
      <Modal
        trigger={<Button onClick={() => this.handleOpen()}>Create Game</Button>}
        open={this.state.modalOpen}
        size='mini'
        onClose={this.handleClose}
      >
        <Header content='Create a Game' textAlign='center' />
        <Modal.Content>
          <CreateGameForm />
        </Modal.Content>
      </Modal>
    );
  }
}

export default CreateGame;
