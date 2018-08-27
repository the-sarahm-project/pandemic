import React from 'react';
import { Sidebar } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Build from './Build';
import Cure from './Cure';
import Move from './Move';
import Treat from './Treat';
import Share from './Share';
import DisplayActionsRemaining from '../DisplayActionsRemaining';
import DiscardCards from './DiscardCards';
import Dispatch from './Dispatch';
import { getRole } from '../../utils';

class ActionFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
    this.checkClicked = this.checkClicked.bind(this);
  }

  async checkClicked(func) {
    if (!this.getClicked()) {
      await this.toggleClicked();
      await func();
      await this.toggleClicked();
    }
  }

  toggleClicked() {
    const clicked = this.state.clicked;
    this.setState({ clicked: !clicked });
  }

  getClicked() {
    return this.state.clicked;
  }

  render() {
    return (
      <Sidebar className="action-footer" direction="bottom" visible={true} width="very wide">
        <DisplayActionsRemaining />
        <div className="action-container">
          <Move />
          <Build checkClicked={this.checkClicked} />
          <Share />
          <Treat checkClicked={this.checkClicked} />
          <Cure />
          <DiscardCards />
          {this.props.role === 'Dispatcher' && <Dispatch />}
        </div>
      </Sidebar>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    role: getRole(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(ActionFooter);

export { default as Build } from './Build';
export { default as Cure } from './Cure';
export { default as Move } from './Move';
export { default as Treat } from './Treat';
export { default as Share } from './Share';
export { default as TreatButton } from './TreatButton';
export { default as TreatModal } from './TreatModal';
export { default as TreatModalContent } from './TreatModalContent';
export { default as DiseaseButton } from './DiseaseButton';
export { default as DiscardCards } from './DiscardCards';
export { default as Dispatch } from './Dispatch';
