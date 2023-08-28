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
      label: "Section 1",
      value: 30,
      radius: 0.9,
      color: "rgba(255, 87, 51, 0.7)",
    },
    {
      label: "Section 2",
      value: 20,
      radius: 0.85,
      color: "rgba(199, 0, 57, 0.7)",
    },
    {
      label: "Section 3",
      value: 15,
      radius: 0.8,
      color: "rgba(144, 12, 63, 0.7)",
    },
    {
      label: "Section 4",
      value: 10,
      radius: 0.75,
      color: "rgba(88, 24, 69, 0.7)",
    },
    {
      label: "Section 5",
      value: 25,
      radius: 0.7,
      color: "rgba(255, 195, 0, 0.7)",
    },
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

    // const path = d3
    //   .arc()
    //   .outerRadius((d) => d.data.outerRadius)
    //   .innerRadius((d) => d.data.innerRadius);

    const path = d3
      .arc()
      .outerRadius((d) => d.data.radius * (radius - 10))
      .innerRadius((d) => d.data.radius * 50);

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

    return () => {
      svg.selectAll("*").remove(); // Elimina los elementos del SVG al desmontar el componente
    };
  }, [editingStartAngle, selectedSection]);

  const toggleEditingAngle = () => {
    setEditingStartAngle(!editingStartAngle);
  };

  return (
    <div className="App">
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
