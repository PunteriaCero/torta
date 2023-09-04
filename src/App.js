import React, { useState } from "react";
import "./App.css";
import { DataTable, RadarComponent, Slider } from "./components";
import { data } from "./data";
import Button from "@mui/material/Button";

function App() {
  const [selectedRow, setSelectedRow] = useState(
    data.sections.find((section) => section.selected) ?? data.sections[0]
  );
  const [currentData, setCurrentData] = useState(data);
  const onClick = (row) => {
    setSelectedRow(row);
  };

  const onChange = (modifiedSection) => {
    console.log(modifiedSection);
    const objetoExistenteIndex = currentData.sections.findIndex(
      (obj) => obj.label === modifiedSection.label
    );

    if (objetoExistenteIndex !== -1) {
      const dataSectionsCopy = [...currentData.sections]; // Hacer una copia de currentData
      dataSectionsCopy[objetoExistenteIndex] = modifiedSection; // Reemplazar el objeto en la copia
      setCurrentData({ ...currentData, sections: dataSectionsCopy }); // Actualizar el estado con la copia modificada
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
            onClick={() => null}
          ></Button>
          <DataTable
            data={currentData.sections}
            onClick={onClick}
            selectedRow={selectedRow}
          />
          <Slider
            key={JSON.stringify(selectedRow)}
            selectedRow={selectedRow}
            onChangeAngle={onChange}
            onChangeRadius={onChange}
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
