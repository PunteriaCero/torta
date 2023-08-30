import React from "react";
import RadarComponent from "./RadarComponent";
import { data } from "./data";

const handleClick = (data) => {
  console.log("Datos recibidos:", data);
};

function App() {
  return (
    <div className="App" style={{backgroundColor: "rgb(56, 56, 56)"}}>
      <RadarComponent data={data} onClick={handleClick} />
    </div>
  );
}

export default App;