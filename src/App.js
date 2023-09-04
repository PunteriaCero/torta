import React, { useState } from "react";
import "./App.css";
import { DataTable, RadarComponent, Slider } from "./components";
import { data, dataDos } from "./data";
import Button from "@mui/material/Button";

function App() {
  const [selectedRow, setSelectedRow] = useState(
    data.sections.find((section) => section.selected) ?? data.sections[0]
  );
  const [currentData, setCurrentData] = useState(data);
  const onClick = (row) => {
    setSelectedRow(row);
  };

  const onChange = (newValues, isAngle) => {
    const [startAngle, endAngle, innerRadius, outerRadius] = newValues;
    const newSelectedRow = {...selectedRow, startAngle: startAngle, endAngle: endAngle, innerRadius: innerRadius, outerRadius: outerRadius} 

    const objetoExistenteIndex = currentData.sections.findIndex(
      (obj) => obj.label === newSelectedRow.label
    );

    if (objetoExistenteIndex !== -1) {
      const dataSectionsCopy = [...currentData.sections];
      dataSectionsCopy.map((section) => section.selected = false);
      dataSectionsCopy[objetoExistenteIndex] = newSelectedRow;
      setCurrentData({ ...currentData, sections: dataSectionsCopy });
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="tableContainer">
          <Button
            variant="contained"
            style={{
              backgroundColor: "black",
              width: "100%",
              position: "relative",
              top: "18px",
            }}
            onClick={() =>
              setCurrentData(currentData === data ? dataDos : data)
            }
          >
            Change Mode
          </Button>
          <DataTable
            data={currentData}
            onClick={onClick}
            selectedRow={selectedRow}
          />
          <Slider
            key={JSON.stringify(selectedRow)}
            selectedRow={selectedRow}
            onChange={onChange}
          />
        </div>
        <RadarComponent
          key={JSON.stringify(currentData)}
          data={currentData}
          onClick={onClick}
          config={{
            radius: "280",
            colorCircles: "rgb(0, 189, 88)",
            strokeLines: 2,
            strokeCircles: 2,
          }}
        />
      </div>
    </div>
  );
}

export default App;
