import React, { useState } from "react";
import { RadarComponent } from "./components";
import { data, dataDos } from "./data";

 

const App = () => {

  const [currentData, setCurrentData] = useState(data);

 

  const handleClick = (newData) => {

    console.log("Datos recibidos:", newData);

    const spanElement = document.getElementById("dataSpan");

    spanElement.textContent = "Indice seleccionado: " + newData.label;

    spanElement.style.color = newData.color;

  };

 

  const cambiarDatos = (datos) => {

    document.getElementById("dataSpan").textContent = "";

    setCurrentData(datos);

  };

 

  return (

    <div className="App" style={{ backgroundColor: "rgb(70, 70, 70)" }}>

      <RadarComponent

        key={JSON.stringify(currentData)}

        data={currentData}

        onClick={handleClick}
        config={{}}

      />

      <span id="dataSpan"></span>

      <br></br>

      <button onClick={() => cambiarDatos(data)}>Data 1</button>

      <button onClick={() => cambiarDatos(dataDos)}>Data 2</button>

      <button onClick={() => cambiarDatos({})}>Limpiar</button>


    </div>

  );


};

export default App;


