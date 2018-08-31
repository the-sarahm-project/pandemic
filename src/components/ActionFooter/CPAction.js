import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Icon, Button } from 'semantic-ui-react/dist/commonjs';
import CPModal from './CPModal';
import { tooManyCards, getSelf, useContingencyCard } from '../../utils';

export const CPAction = ({ self, tooManyCards }) => {
  return (
    self.cpEventCard ?
    <Button
        className="action-button cpaction-button"
        disabled={tooManyCards}
        style={{height: '100%'}}
        onClick={() => useContingencyCard(self)}
    >
      <Icon className="lab-icon action-icon" name="lab" size="large" />
      <div className="cpaction-text action-text">CPAction</div>
    </Button> :
    <CPModal />
  );
};

export const mapStateToProps = (state) => {
  return {
    tooManyCards: tooManyCards(state),
    self: getSelf(state),
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(CPAction);
