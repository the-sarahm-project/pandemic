import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Icon, Button } from 'semantic-ui-react';
import { ChoosePlayerModal } from '../index';
import { shareKnowledge, getCurrentTurn, getShareKnowledgeDisabled, getShareKnowledgePlayers, getOwnCity, getActionsRemaining, getNextTurn, getOwnId, tooManyCards, getDispatching, isCurrentTurn } from '../../utils';

export const Share = ({ currentTurn, shareKnowledgeDisabled, shareKnowledgePlayers, ownCity, ownId, actionsRemaining, nextTurn, tooManyCards, dispatching }) => {
  return (
    <ChoosePlayerModal
      ModalTrigger={(
        <Button
          className="action-button share-button"
          disabled={!isCurrentTurn(currentTurn) || shareKnowledgeDisabled}
        >
          <Icon className="share-icon action-icon" name="gift" size="large" />
          <div className="share-text action-text">Share</div>
        </Button>
      )}
      actionsRemaining={actionsRemaining}
      disabled={shareKnowledgeDisabled}
      players={shareKnowledgePlayers}
      action={shareKnowledge.bind(this, ownId, ownCity, actionsRemaining, nextTurn)}
      clickable={actionsRemaining && isCurrentTurn(currentTurn) && !tooManyCards && !dispatching}
    />
  );
};

export const mapStateToProps = (state) => {
  return {
    currentTurn: getCurrentTurn(state),
    shareKnowledgeDisabled: getShareKnowledgeDisabled(state),
    shareKnowledgePlayers: getShareKnowledgePlayers(state),
    ownCity: getOwnCity(state),
    actionsRemaining: getActionsRemaining(state),
    nextTurn: getNextTurn(state),
    ownId: getOwnId(state),
    tooManyCards: tooManyCards(state),
    dispatching: getDispatching(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Share);

