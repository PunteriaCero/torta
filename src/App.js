import React from "react";
import {RadarComponent} from "./components";
import { data } from "./data";

const handleClick = (data) => {
  console.log("Datos recibidos:", data);
};

const config={};
function App() {
  return (
    <div className="App" style={{backgroundColor: "rgb(56, 56, 56)", minHeight:"100vh"}}>
      <RadarComponent data={data} config={config} onClick={handleClick} />
    </div>
  );
}

export default App;