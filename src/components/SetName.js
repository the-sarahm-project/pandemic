import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getPlayers, getPlayerRef, getCurrentId } from '../utils';

class SetName extends React.Component {
  constructor(props) {
    super(props);
    const userid = getCurrentId(props);
    this.state = {
      name: props.players[userid].name,
      userid
    };
    this.handleNameChange = (e, { value }) => this.setState({ name: value });
    this.handleUserIDChange = (e, { value }) => this.setState({ userid: value });
  }

  render() {
    const { name, userid } = this.state;
    const { firestore } = this.props;
    return (
      <Form onSubmit={ async e => {
        e.preventDefault();
        const playerRef = await getPlayerRef(firestore, userid);
        await playerRef.update({ name });
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
