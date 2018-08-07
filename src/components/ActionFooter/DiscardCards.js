import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Icon, Button } from 'semantic-ui-react';
import ChooseCardModal from '../ChooseCardModal';
import { removeCardFromHand, getOwnHand } from '../../utils';

export const DiscardCards = ({ playerHand, firebase }) => {
  const id = firebase.auth().currentUser.id;
  return (
    <ChooseCardModal
      ModalTrigger={(
        <Button
          className="action-button trash-button"
          disabled={playerHand.length <= 7}
        >
          <Icon className="trash-icon action-icon" name="trash" size="big" />
          <div className="trash-text action-text">Trash</div>
        </Button>
      )}
      cards={playerHand}
      header='Choose Card(s) to Remove'
      action={removeCardFromHand.bind(this, id, playerHand)}
    />
  );
};

export const mapStateToProps = (state) => {
  return {
    playerHand: getOwnHand(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(DiscardCards);
