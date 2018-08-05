import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getPlayers, getPlayerRef, getGameRef } from '../utils';

class SetName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      id: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e, { value }) {
    if (value.length < 13) this.setState({ name: value });
  }

  /* eslint-disable react/no-did-mount-set-state */
  componentDidMount() {
    const { players, firebase } = this.props;
    const id = firebase.auth().currentUser.id;
    this.setState({ name: players[id].name, id });
  }

  async updatePlayer(name, id) {
    const gameRef = await getGameRef();
    const playerRef = await getPlayerRef(id, gameRef);
    await playerRef.update({ name });
  }

  render() {
    const { name, id } = this.state;
    return (
      <Form
        style={{ display: 'flex', justifyContent: 'center' }}
        onSubmit={ async e => {
          e.preventDefault();
          if (!name.length) return alert('Name cannot be blank!');
          await this.updatePlayer(name, id);
        }}
      >
        <Form.Group style={{margin: '.5em 0em 1em .5em'}}>
          <Input
            placeholder='Name'
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <Form.Button content='Submit' />
        </Form.Group>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    players: getPlayers(state)
  };
};

export default withRouter(compose(firestoreConnect(), connect(mapStateToProps))(SetName));
