import React from 'react';
import { Icon, Button } from 'semantic-ui-react';
import { ChooseCardModal } from '../index';
import { setCityResearchStation } from '../../utils';

const Build = ({ currentTurn, firestore, buildDisabled, currentCity, unusedCityCards, sameColorCityCards }) => {
  return (
    <ChooseCardModal
      ModalTrigger={(
        <Button
          className="action-button build-button"
          disabled={buildDisabled}
          style={{height: '100%'}}
        >
          <Icon className="building-icon action-icon" name="building" size="big" />
          <div className="build-text action-text">Build</div>
        </Button>
      )}
      disabled={buildDisabled}
      cards={sameColorCityCards}
      action={setCityResearchStation.bind(this, firestore, currentTurn, currentCity, unusedCityCards)}
    />
  );
};

export default Build;
