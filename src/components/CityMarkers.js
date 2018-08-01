import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { Label } from 'semantic-ui-react';
import { ResearchStation, DiseaseCube } from './index';
import { iconContainer, getCities, getCityDiseaseCubes, getSelf, changeCurrentCity, getActionsRemaining, getNextTurn } from '../utils';

export const CityMarkers = ({ cities, self, actionsRemaining, nextTurn }) => {
  const isHighlighted = self.isMoving && cities[self.currentCity].researchStation;
  return (
    <div>
      {isLoaded(cities) && Object.values(cities).map(city => {
        const cubes = getCityDiseaseCubes(city);
        return (
          <div key={city.coords}>
            <Marker position={city.coords} icon={iconContainer[city.color]}>
              <Tooltip className='city-tooltip' offset={[0, 20, 2000]} permanent={true} direction='bottom' opacity={.9}>
                <Label basic size='mini'>{city.name}</Label>
              </Tooltip>
            </Marker>
            {city.researchStation && <ResearchStation coords={city.coords} researchStation={city.researchStation} />}
            {cubes.map(cube => {
              return <DiseaseCube key={`${city.coords}-${cube}`} coords={city.coords} cube={cube} />;
            })}
            {isHighlighted && city.researchStation &&
              <Marker
                position={city.coords}
                icon={iconContainer.highlight}
                zIndexOffset={1001}
                onClick={() => changeCurrentCity(self.id, city.id, actionsRemaining, nextTurn)}
              />}
          </div>
        );
      })}
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    cities: getCities(state),
    self: getSelf(state),
    actionsRemaining: getActionsRemaining(state),
    nextTurn: getNextTurn(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(CityMarkers);

