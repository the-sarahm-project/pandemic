import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Header, Modal, Icon, Button } from 'semantic-ui-react';
import { ModalActions } from '../index';
import { TreatModalContent } from './index';
import { treatDisease, getCurrentCity } from '../../utils';

export class TreatModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      modalOpen: false
    };
    this.handleOpen = () => this.setState({ modalOpen: true });
    this.handleClose = () => this.setState({ modalOpen: false });
  }

  render() {
    const { firestore, diseases, currentCity } = this.props;
    return (
      <Modal
        trigger={
          <Button
            className="action-button treat-button"
            disabled={!diseases.length}
            onClick={() => this.handleOpen()}
          >
            <Icon className="treat-icon action-icon" name="medkit" size="big" />
            <div className="treat-text action-text">Treat</div>
          </Button>
        }
        open={this.state.modalOpen}
      >
        <Header icon='users' content='Choose a Disease To Treat' />
        <TreatModalContent
          diseases={diseases}
          setSelected={selected => this.setState({ selected })}
          selected={this.state.selected}
        />
        <ModalActions
          action={treatDisease.bind(this, { firestore, currentCity })}
          handleClose={this.handleClose}
          selected={this.state.selected}
        />
      </Modal>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    currentCity: getCurrentCity(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(TreatModal);
