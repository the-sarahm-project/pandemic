import React from 'react';
import { Icon, Button } from 'semantic-ui-react';
import { ChoosePlayerModal } from '../index';
import { shareKnowledge } from '../../utils';

const Share = ({ currentTurn, shareDisabled, sharePlayers, currentCity, firestore }) => {
  return (
    <ChoosePlayerModal
      ModalTrigger={(
        <Button
          className="action-button share-button"
          disabled={shareDisabled}
        >
          <Icon className="share-icon action-icon" name="gift" size="big" />
          <div className="share-text action-text">Share</div>
        </Button>
      )}
      disabled={shareDisabled}
      players={sharePlayers}
      action={shareKnowledge.bind(this, firestore, currentTurn, currentCity)}
    />
  );
};

export default Share;
