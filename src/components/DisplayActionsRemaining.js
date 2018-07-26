import React from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getActionsRemaining } from '../utils';

const DisplayActionsRemaining = ({ actionsRemaining }) => {
  return (
    <Segment
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%'
      }}
      inverted
    >
      {`Actions Remaining: ${actionsRemaining}`}
    </Segment>
  );
};

export const mapStateToProps = (state) => {
  return {
    actionsRemaining: getActionsRemaining(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(DisplayActionsRemaining);
