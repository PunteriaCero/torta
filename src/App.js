import React from "react";
import RadarComponent from "./RadarComponent";
import { data } from "./data";

const handleClick = (data) => {
  console.log("Datos recibidos:", data);
};

function App() {
  return (
    <div className="App" style={{backgroundColor: "darkgray"}}>
      <RadarComponent data={data} onClick={handleClick}/>
    </div>
  );
}

export default App;