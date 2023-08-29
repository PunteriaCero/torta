import React from "react";
import RadarComponent from "./RadarComponent";
import { data } from "./data";

function App() {
  return (
    <div className="App" style={{backgroundColor: "darkgray"}}>
      <RadarComponent data={data}/>
    </div>
  );
}

export default App;