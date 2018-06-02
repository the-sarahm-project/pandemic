import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { DiseaseButton } from './index';

const TreatModalContent = ({ diseases, setSelected, selected }) => {
  return (
    <Modal.Content>
      {diseases && diseases.length &&
        <Button.Group
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
        </Button.Group>}
    </Modal.Content>
  );
};

export default TreatModalContent;
