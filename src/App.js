import React, { useState } from 'react';
import './App.css';
import { DataTable, Slider } from './components';
import { data } from './data';
import Button from '@mui/material/Button';
import { RadarComponent } from 'radar-render';

function App() {
  const [showSections, setShowSections] = useState(true);
  const [sectionsData, setSectionsData] = useState(data.sections);
  const [targetsData, setTargetsData] = useState(data.targets);
  const [selectedRow, setSelectedRow] = useState(
    data.sections.find((section) => section.selected) ?? data.sections[0]
  );
  const [currentData, setCurrentData] = useState(data.sections);
  const onClick = (row) => {
    setSelectedRow(row);
  };

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
              setCurrentData(currentData.length ? [] : data.sections);
              setShowSections(!showSections);
            }}
          >
            Change Mode
          </Button>
          <DataTable
            showSections={showSections}
            targets={targetsData}
            sections={sectionsData}
            selectedRow={selectedRow}
          />
          <div>
            {showSections ? (
              <Slider
                key={JSON.stringify(selectedRow)}
                selectedRow={selectedRow}
                sections={sectionsData}
                setSections={setSectionsData}
              />
            ) : null}
          </div>
        </div>
        <RadarComponent
          key={JSON.stringify(currentData)}
          sections={sectionsData}
          setSections={setSectionsData}
          targets={targetsData}
          setTargets={setTargetsData}
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
