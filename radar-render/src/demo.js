import React, { useState } from 'react'; 
import { data, dataDos } from './data/index.js';
import RadarComponent from './components/RadarComponent.js';
import './styles.css';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App/>);

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

  return (
    <div className="App">
      <div className="container">
        <div className="btnContainer">
          <button
            onClick={() => {
              setCurrentData(currentData.sections.length ? dataDos : data);
              setShowSections(!showSections);
            }}
          >
            Change Mode
          </button>
        </div>
        <RadarComponent
          key={JSON.stringify(currentData)}
          sections={sectionsData}
          setSections={setSectionsData}
          targets={targetsData}
          settTargets={settTargetsData}
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


