import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Icon, Button } from 'semantic-ui-react';
import { ChoosePlayerModal } from '../index';
import { shareKnowledge, getCurrentTurn, getShareKnowledgeDisabled, getShareKnowledgePlayers, getCurrentCity, getActionsRemaining, getNextTurn } from '../../utils';

export const Share = ({ currentTurn, shareKnowledgeDisabled, shareKnowledgePlayers, currentCity, firestore, actionsRemaining, nextTurn }) => {
  return (
    <ChoosePlayerModal
      ModalTrigger={(
        <Button
          className="action-button share-button"
          disabled={shareKnowledgeDisabled}
        >
          <Icon className="share-icon action-icon" name="gift" size="big" />
          <div className="share-text action-text">Share</div>
        </Button>
      )}
      disabled={shareKnowledgeDisabled}
      players={shareKnowledgePlayers}
      action={shareKnowledge.bind(this, firestore, currentTurn, currentCity, actionsRemaining, nextTurn)}
    />
  );
};

export const mapStateToProps = (state) => {
  return {
    currentTurn: getCurrentTurn(state),
    shareKnowledgeDisabled: getShareKnowledgeDisabled(state),
    shareKnowledgePlayers: getShareKnowledgePlayers(state),
    currentCity: getCurrentCity(state),
    actionsRemaining: getActionsRemaining(state),
    nextTurn: getNextTurn(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Share);

