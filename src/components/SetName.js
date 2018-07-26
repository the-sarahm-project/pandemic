import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import history from '../history';
import { getPlayers, setUserOnState } from '../utils';

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
    setUserOnState.call(this);
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
        <Form.Group style={{margin: '.5em 0 .5em .5em'}}>
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
