import React, { useState } from 'react';
import { data } from './data/index.js';
import RadarComponent from './components/RadarComponent.js';
import Button from '@mui/material/Button';
import './styles.css';

import { createRoot } from 'react-dom/client';
import DataTable from './components/DataTable.js';
import Slider from './components/RangeSlider.js';
import { Container, Grid } from '@mui/material';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

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
      <Grid
        container
        spacing={2}
        padding={0}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={6}>
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
        </Grid>
        <Grid item xs="auto"></Grid>
        <Grid item xs={5}>
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
        </Grid>
      </Grid> 
  );
}
