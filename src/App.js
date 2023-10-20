import React, { useState } from 'react';
import './App.css';
import { DataTable, Slider } from './components';
import { data, dataDos } from './data';
import Button from '@mui/material/Button';
import {
  RadarComponent,
  ReferenceSectionSVG,
  UpdatePositionCircle,
} from 'radar-render';

function App() {
  const [showSections, setShowSections] = useState(true);
  const [sectionsData, setSectionsData] = useState(data.sections);
  const [targetsData, settTargetsData] = useState(data.targets);
  const [selectedRow, setSelectedRow] = useState(
    data.sections.find((section) => section.selected) ?? data.sections[0]
  );
  const [currentData, setCurrentData] = useState(data);
  const onClick = (row) => {
    setSelectedRow(row);
  };

  const onChange = (newValues, activeThumb, isChangeRadius = false) => {
    let [startAngle, endAngle, innerRadius, outerRadius] = newValues;

    if (startAngle < 0) {
      startAngle += 360;
    }
    if (endAngle < 0) {
      endAngle += 360;
    }

    const newSelectedRow = {
      ...selectedRow,
      startAngle: startAngle,
      endAngle: endAngle,
      innerRadius: innerRadius,
      outerRadius: outerRadius,
    };

    const objetoExistenteIndex = sectionsData.findIndex(
      (obj) => obj.label === newSelectedRow.label
    );

    if (objetoExistenteIndex !== -1) {
      const dataSectionsCopy = [...sectionsData];
      dataSectionsCopy.map((section) => section.selected === false);
      dataSectionsCopy[objetoExistenteIndex] = newSelectedRow;
      setSectionsData(dataSectionsCopy);
      const reference = ReferenceSectionSVG(newSelectedRow);
      if (isChangeRadius) {
        UpdatePositionCircle(newSelectedRow, reference, true);
        UpdatePositionCircle(newSelectedRow, reference, false);
      } else {
        UpdatePositionCircle(newSelectedRow, reference, !activeThumb);
      }
    }
  };

  // const verifySeletectionSection = () => {
  //   const circleElement = d3.select(`#section-${selectedRow?.label}`).node();
  //   if (circleElement) {
  //     d3.select(circleElement).dispatch('click');
  //   }
  // };

  return (
    <div className="App">
      <div className="container">
        <div className="tableContainer">
          <Button
            variant="contained"
            style={{
              backgroundColor: 'black',
              width: '100%',
              position: 'relative',
              top: '18px',
            }}
            onClick={() => {
              setCurrentData(currentData.sections.length ? dataDos : data);
              setShowSections(!showSections);
            }}
          >
            Change Mode
          </Button>
          <DataTable
            showSections={showSections}
            targets={targetsData}
            sections={sectionsData}
            onClick={onClick}
            selectedRow={selectedRow}
          />
          <div style={{ visibility: showSections ? 'visible' : 'hidden' }}>
            <Slider
              key={JSON.stringify(selectedRow)}
              selectedRow={selectedRow}
              onChange={onChange}
            />
          </div>
        </div>
        <RadarComponent
          key={JSON.stringify(currentData)}
          sectionsData={sectionsData}
          setSectionsData={setSectionsData}
          targetsData={targetsData}
          settTargetsData={settTargetsData}
          showSections={showSections}
          onClick={onClick}
          onDrag={(updatedValue) => {
            setSelectedRow(updatedValue);
          }}
          config={{
            radius: '280',
            colorCircles: 'rgb(0, 189, 88)',
            strokeLines: 2,
            strokeCircles: 2,
          }}
        />
      </div>
    </div>
  );
}
export default App;
