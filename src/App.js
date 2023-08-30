import React from "react";
import RadarComponent from "./RadarComponent";
import { data } from "./data";

const handleClick = (data) => {
  console.log("Datos recibidos:", data);
  const spanElement = document.getElementById("dataSpan");
  spanElement.textContent = "Indice seleccionado: " + data.label;
  spanElement.style.color = data.color;
};

function App() {
  return (
    <div className="App" style={{backgroundColor: "rgb(56, 56, 56)"}}>
      <RadarComponent data={data} onClick={handleClick} />
      <span id="dataSpan"></span>
    </div>
  );
}

export default App;