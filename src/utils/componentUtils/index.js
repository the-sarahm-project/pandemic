import history from '../../history';

export * from './choosePlayerModal';
export * from './cityLines';
export * from './board';
export * from './cityMarkers';
export * from './playerMarkers';
export * from './playerMenu';
export * from './chooseCardModal';
export * from './app';
export * from './actionFooterUtils/index';

export function setUserOnState() {
  const { firestore, firebase, players } = this.props;
  const doc = history.location.pathname.slice(1);
  firebase.auth().onAuthStateChanged(async user => {
    if (user) {
      // User is signed in.
      const game = await firestore.get(`games/${doc}`);
      for (const [key, value] of Object.entries(players)) {
        // user is in game.
        if (value.uid === user.uid) {
          this.setState({ userid: key });
          break;
        // user is not in game.
        } else if (!value.active) {
          game.ref.collection('players').doc(key).update({ active: true, uid: user.uid });
          this.setState({ userid: key });
          break;
        }
      }
    }
  });
}
