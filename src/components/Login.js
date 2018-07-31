import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { SidebarCards, Board, ActionFooter } from './index';
import { getPlayers, getPlayerRef } from '../utils';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  /* eslint-disable react/no-did-mount-set-state */
  async componentDidMount() {
    const { players, firebase } = this.props;
    const currentUser = firebase.auth().currentUser;
    const uid = currentUser.uid;
    for (const [key, value] of Object.entries(players)) {
      if (value.uid === uid) {
        currentUser.id = +key;
        return await this.setState({ loggedIn: true });
      } else if (!value.active) {
        currentUser.id = +key;
        await getPlayerRef(key).update({ active: true, uid });
        return await this.setState({ loggedIn: true });
      }
    }
    console.log('Game is full');
  }

  render() {
    return (
      this.state.loggedIn &&
        <div className="game">
          <SidebarCards />
          <Board />
          <ActionFooter />
        </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    players: getPlayers(state),

  };
};

export default withRouter(compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Login));
