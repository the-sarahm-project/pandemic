import React, { Component } from 'react';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
//make all city markers (has its own component + own state) that has a local state of display false, or hidden
//when "MOVE" is clicked, this will change local state display of the neighbors ONLY.
//maybe bind an onclick to true or false depending on if it's a neighbor
//onClick, it will change everything back to hidden & then also update the current city


/*Add statuses onto the currentPlayer, and they should all be false, i.e.
isMoving: false
isFerry: false
etc.

On my component, when isMoving is true, the component will have an onclick that will set it to false
and then the component itself will render the neighbors
because it's connected to the store.

onclick
- set to false
- move currentCity
*/
class CityHighlightMarker extends Component {
  constructor(props) {
    super(props);
    //mmaaaaybe put the 'showNeighbors' on local state for now
    this.state = {
      showNeighbors: false,
      isMoving: false,
      isFerry: false
    };
  }


  render() {
    return (
      <Marker />
    )
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(CityHighlightMarker);
