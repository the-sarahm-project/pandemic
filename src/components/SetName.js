import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import history from '../history';
import { getPlayers } from '../utils';

class SetName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      userid: ''
    };
    this.handleNameChange = (e, { value }) => this.setState({ name: value });
    this.handleUserIDChange = (e, { value }) => this.setState({ userid: value });
  }

  componentDidMount() {
    const { players, firebase } = this.props;
    const doc = history.location.pathname.slice(1);
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        // User is signed in.
        const game = await this.props.firestore.get(`games/${doc}`);
        for (const [key, value] of Object.entries(players)) {
          if (value.id === user.uid) {
            this.setState({ userid: key });
            break;
          } else if (!value.active) {
            game.ref.collection('players').doc(key).update({ active: true, id: user.uid });
            user.id = key;
            this.setState({ userid: key });
            break;
          }
        }
      }
    });
  }

  render() {
    const { name, userid } = this.state;
    const doc = history.location.pathname.slice(1);
    return (
      <Form onSubmit={ async e => {
        e.preventDefault();
        const game = await this.props.firestore.get(`games/${doc}`);
        await game.ref.collection('players').doc(userid).update({ name });
      }}>
        <Form.Group style={{margin: '0 0 1em .5em'}}>
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
