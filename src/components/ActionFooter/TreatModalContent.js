import React from 'react';
import { ModalContent, ButtonGroup } from 'semantic-ui-react';
import { DiseaseButton } from './index';

const TreatModalContent = ({ diseases, setSelected, selected }) => {
  return (
    <ModalContent>
      {diseases && diseases.length &&
        <ButtonGroup
          className="disease-button-group"
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {diseases.map(disease => {
            const [diseaseColor, numCubes] = disease;
            return (
              <DiseaseButton
                active={disease.toString() === selected}
                key={diseaseColor}
                diseaseColor={diseaseColor}
                numCubes={numCubes}
                setSelected={setSelected}
              />
            );
          })}
        </ButtonGroup>}
    </ModalContent>
  );
};

export default TreatModalContent;
