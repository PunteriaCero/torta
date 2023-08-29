import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

import "./App.css";

function App() {
  const width = 300;
  const height = 300;
  const radius = Math.min(width, height) / 2;

  // const data = [
  //   {
  //     label: "Section 1",
  //     value: 30,
  //     radius: 0.9,
  //     color: "rgba(255, 87, 51, 0.7)",
  //     startAngle: 20,
  //     endAngle: 30,
  //     outerRadius: 0.9 * (radius - 10),
  //     innerRadius: 0.9 * 50,
  //     startElevation: 4,
  //     endElevation: 6,
  //   },
  //   {
  //     label: "Section 2",
  //     value: 20,
  //     radius: 0.85,
  //     color: "rgba(199, 0, 57, 0.7)",
  //     startAngle: 20,
  //     endAngle: 30,
  //     outerRadius: 0.85 * (radius - 10),
  //     innerRadius: 0.85 * 50,
  //     startElevation: 4,
  //     endElevation: 6,
  //   },
  //   {
  //     label: "Section 3",
  //     value: 15,
  //     radius: 0.8,
  //     color: "rgba(144, 12, 63, 0.7)",
  //     startAngle: 20,
  //     endAngle: 30,
  //     outerRadius: 0.8 * (radius - 10),
  //     innerRadius: 0.8 * 50,
  //     startElevation: 4,
  //     endElevation: 6,
  //   },
  //   {
  //     label: "Section 4",
  //     value: 10,
  //     radius: 0.75,
  //     color: "rgba(88, 24, 69, 0.7)",
  //     startAngle: 20,
  //     endAngle: 30,
  //     outerRadius: 0.75 * (radius - 10),
  //     innerRadius: 0.75 * 50,
  //     startElevation: 4,
  //     endElevation: 6,
  //   },
  //   {
  //     label: "Section 5",
  //     value: 25,
  //     radius: 0.7,
  //     color: "rgba(255, 195, 0, 0.7)",
  //     startAngle: 20,
  //     endAngle: 30,
  //     outerRadius: 0.7 * (radius - 10),
  //     innerRadius: 0.7 * 50,
  //     startElevation: 4,
  //     endElevation: 6,
  //   },
  // ];
  const data = [
    {
      label: "Prueba 1",
      innerRadius: 0.5,
      outerRadius: 0.9,
      startAngle: 10,
      endAngle: 35,
      color: "rgba(199, 0, 57, 0.7)",
    },
    {
      label: "Prueba 2",      
      innerRadius: 0.15,
      outerRadius: 0.66,
      startAngle: 20,
      endAngle: 189,
      color: "rgba(5, 0, 57, 0.7)",
    },
    {
      label: "Prueba 3",      
      innerRadius: 0.25,
      outerRadius: 0.96,
      startAngle: 120,
      endAngle: 360,
      color: "rgba(88, 0, 57, 0.7)",
    }

    
  ];

  const pointsData = [
    {
      angle: 3,
      radius: 0.8,
      elevation: 5,
      color: "green",
    },
    {
      angle: 90,
      radius: 0.7,
      elevation: 5,
      color: "blue",
    },
  ];

  const baseCircles = [
    { radius: 0.01, color: "green" },
    { radius: 0.125, color: "green" },
    { radius: 0.250, color: "green" },
    { radius: 0.375, color: "green" },
    { radius: 0.500, color: "green" },
    { radius: 0.625, color: "green" },    
    { radius: 0.750, color: "green" },
    { radius: 0.875, color: "green" },    
    { radius: 1, color: "green" },
  ];

  const chartRef = useRef(null);
  const svgRef = useRef(null);
  const [editingStartAngle, setEditingStartAngle] = useState(true);
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3
      .pie()
      .value((d) => d.value)
      .sort(null);

    const path = d3
      .arc()
      .outerRadius((d) => d.data.outerRadius * radius) // En caso de que venga un valor de 0 a 1, se multiplica por el radio maximo para que sea porcentual
      .innerRadius((d) => d.data.innerRadius * radius)
      .startAngle((d) => (d.data.startAngle) * (Math.PI / 180)) // Se convierte de Grados a Radianes
      .endAngle((d) => (d.data.endAngle) * (Math.PI / 180)); // Se convierte de Grados a Radianes

    const sections = svg
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr(
        "class",
        (d, i) => `arc ${data.selected ? "selected" : ""}`
      );

    sections
      .append("path")
      .attr("d", path)
      .attr("fill", (d) => d.data.color)
      .attr("stroke", "white")
      .attr("stroke-width", 2);

    const points = svg
      .selectAll("circle")
      .data(pointsData)
      .enter()
      .append("circle")
      .attr("cx", (d) => 100)
      .attr("cy", (d) => -d.radius * Math.sin(d.angle))
      .attr("r", 5)
      .attr("fill", (d) => d.color);

    const handleClick = (event, d, i) => {
      console.log("d", d);
      setSelectedSection(d.index);
    };

    const handleWheel = (event, d, i) => {
      const amplitude = parseFloat(event.deltaY) * 0.1;
      if (editingStartAngle) {
        d.startAngle += amplitude * (Math.PI / 180);
      } else {
        d.endAngle += amplitude * (Math.PI / 180);
      }
      redraw();
      event.preventDefault();
    };

    sections.on("wheel", handleWheel);
    sections.on("click", handleClick);

    function redraw() {
      sections.select("path").attr("d", path);
    }

    const base = svg.append("g").attr("class", "base");

    baseCircles.forEach((circle) => {
      base
        .append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", circle.radius * radius)
        .attr("stroke", circle.color)
        .attr("stroke-width", 1)
        .attr("fill", "none");
    });

// Agregar líneas desde el centro hasta el radio máximo en intervalos de 30 grados
const numLines = 12; // 360 grados / 30 grados = 12 líneas
for (let i = 0; i < numLines; i++) {
  const angle = (i * 30 * Math.PI) / 180; // Convertir a radianes
  const x2 = Math.cos(angle) * radius; // Coordenada x del final de la línea
  const y2 = Math.sin(angle) * -radius; // Coordenada y del final de la línea (negativo para invertir el eje y)

  svg.append("line")
    .attr("x1", 0)             // Coordenada x del inicio de la línea (centro)
    .attr("y1", 0)             // Coordenada y del inicio de la línea (centro)
    .attr("x2", x2)            // Coordenada x del final de la línea
    .attr("y2", y2)            // Coordenada y del final de la línea
    .attr("stroke", "green")   // Color de la línea (verde)
    .attr("stroke-width", 1)   // Ancho de la línea
    .attr("opacity", 0.2);     // Opacidad para un aspecto más suave
}

    return () => {
      svg.selectAll("*").remove(); // Elimina los elementos del SVG al desmontar el componente
    };
  }, [editingStartAngle, selectedSection]);

  const toggleEditingAngle = () => {
    setEditingStartAngle(!editingStartAngle);
  };

  return (
    <div className="App">
      <span>N</span>
      <div id="chart" ref={chartRef}>
        <svg ref={svgRef}></svg>
      </div>
      <button onClick={toggleEditingAngle}>
        {editingStartAngle ? "Editar Ángulo Inicial" : "Editar Ángulo Final"}
      </button>
      <p>Usar ruedita del mouse sobre cada porción para cambiar su amplitud</p>
    </div>
  );
}

export default App;
