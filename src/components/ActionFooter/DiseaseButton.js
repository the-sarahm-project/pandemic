import React from 'react';
import { Button, Image } from 'semantic-ui-react';

const DiseaseButton = ({ diseaseColor, numCubes, setSelected, active }) => {
  return (
    <Button
      className="disease-button"
      value={[diseaseColor, numCubes]}
      toggle
      active={active}
      style={{
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: '10px',
        flexShrink: 1,
        maxWidth: '33%',
        minWidth: '25%'
      }}
      onClick={event => setSelected(event.currentTarget.value)}
    >
      <div style={{ display: 'flex' }}>
        <Image
          wrapped
          size='small'
          src={`assets/images/disease_large_${diseaseColor}.png`}
          style={{ width: 'auto' }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}
        >
          <div>{numCubes}</div>
        </div>
      </div>
    </Button>
  );
};

export default DiseaseButton;
