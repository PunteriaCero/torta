import React, { useEffect, useState } from 'react';
import './App.css';
import { DataTable, RadarComponent, Slider } from './components';
import { data, dataDos } from './data';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import {
  saveItem,
  saveSections,
  saveTargets,
  sortSections,
} from './redux/slices/dataSlice';
import { useDataSelector } from './redux/hooks/dataHooks';
import * as d3 from 'd3';

function App() {
  const dispatch = useDispatch();
  const dataRedux = useDataSelector();
  const [selectedRow, setSelectedRow] = useState();
  const [currentData, setCurrentData] = useState(dataRedux);

  const [disabled, setDisabled] = useState(false);

  const saveSelectedRow = () => {
    const selectedData = dataRedux.sections.find(
      (section) => section.selected === true
    );

    setSelectedRow(selectedData);
    dispatch(saveItem(selectedData));
  };

  const verifySeletectionSection = () => {
    const circleElement = d3.select(`#section-${selectedRow?.label}`).node();
    if (circleElement) {
      d3.select(circleElement).dispatch('click');
    }
  };

  useEffect(() => {
    dispatch(sortSections());
    saveSelectedRow();
    verifySeletectionSection();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRow]);

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
              if (dataRedux.sections.length) {
                dispatch(saveTargets(dataDos.targets));
                dispatch(saveSections([]));
              } else {
                dispatch(saveTargets([]));
                dispatch(saveSections(data.sections));
                saveSelectedRow();
              }
              setCurrentData(dataRedux.sections.length ? dataDos : data);
              setDisabled(!disabled);
            }}
          >
            Change Mode
          </Button>
          <DataTable />
          <div style={{ visibility: disabled ? 'hidden' : 'visible' }}>
            {selectedRow ? <Slider key={JSON.stringify(selectedRow)} /> : null}
          </div>
        </div>
        <RadarComponent
          key={JSON.stringify(currentData)}
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
