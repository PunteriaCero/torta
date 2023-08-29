import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import "./App.css";
/* 
const data = [
    {
        label: "1",
        innerRadius: 0.5,
        outerRadius: 0.9,
        startAngle: 10,
        endAngle: 35,
        color: "rgba(199, 0, 57, 0.7)",
    },
    {
        label: "2",
        innerRadius: 0.15,
        outerRadius: 0.66,
        startAngle: 20,
        endAngle: 189,
        color: "rgba(5, 0, 57, 0.7)",
    },
    {
        label: "3",
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
 */

function generateBaseCircles(numCircles, color) {
  const baseCircles = [];

  for (let i = 0; i < numCircles; i++) {
    const radius = i / (numCircles - 1);
    baseCircles.push({ radius, color });
  }

  return baseCircles;
}

function RadarComponent({
  data,
  radius = 200,
  numCircles = 9,
  colorCircles = "green",
  numLines = 24,
  colorLines = "green",
  north = "N",
}) {
  const [selectedSection, setSelectedSection] = useState(null);
  const handleClick = (event, d, i) => {
    setSelectedSection(d.data.index);
    d.data.selected = true;
  };

  const width = radius * 2;
  const height = width;
  const baseCircles = generateBaseCircles(numCircles, colorCircles);

  const chartRef = useRef(null);
  const svgRef = useRef(null);

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

    // Agregar líneas desde el centro hasta el radio máximo en intervalos segun numLineas
    for (let i = 0; i < numLines; i++) {
      const angle = ((i * 360) / numLines) * (Math.PI / 180); // Calcular el ángulo en radianes
      const x2 = Math.cos(angle) * radius;
      const y2 = Math.sin(angle) * -radius;

      svg
        .append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("stroke", colorLines)
        .attr("stroke-width", 1)
        .attr("opacity", 0.2);
    }

    const path = d3
      .arc()
      .outerRadius((d) => d.data.outerRadius * radius) // En caso de que venga un valor de 0 a 1, se multiplica por el radio maximo para que sea porcentual
      .innerRadius((d) => d.data.innerRadius * radius)
      .startAngle((d) => d.data.startAngle * (Math.PI / 180)) // Se convierte de Grados a Radianes
      .endAngle((d) => d.data.endAngle * (Math.PI / 180)); // Se convierte de Grados a Radianes

    const sections = svg
      .selectAll(".arc")
      .data(pie(data.sections))
      .enter()
      .append("g");
    //.attr(
    //    "class",
    //    (d, i) => `arc ${data.selected ? "selected" : ""}`
    //);

    sections
      .append("path")
      .attr("d", path)
      .attr("fill", (d) => (d.selected ? d.data.color : "transparent"))
      .attr("stroke", "white")
      .attr("stroke-width", 2);

    sections
      .append("rect") // Agregar rectángulo como fondo de la etiqueta
      .attr("x", (d) => {
        const centroid = path.centroid(d);
        return centroid[0] - 15; // Ajusta la posición en x
      })
      .attr("y", (d) => {
        const centroid = path.centroid(d);
        return centroid[1] - 15; // Ajusta la posición en y
      })
      .attr("width", 20) // Ancho del rectángulo
      .attr("height", 20) // Altura del rectángulo
      .attr("fill", "rgb(255, 255, 255)") // Color del fondo
      .attr("rx", 4) // Radio horizontal de las esquinas
      .attr("ry", 4)
      .attr("stroke", "white")
      .attr("stroke-width", 2); // Radio vertical de las esquinas

    sections
      .append("text")
      .attr("transform", (d) => {
        const centroid = path.centroid(d);
        return `translate(${centroid})`;
      })

      .attr("dy", "0.1em")
      .attr("dx", "-0.3em")
      .text((d) => d.data.label)
      .style("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .style("fill", "rgb(72, 207, 135)");

    const points = svg
      .selectAll(".point")
      .data(data.targets)
      .enter()
      .append("g")
      .attr("class", "point")
      .attr(
        "transform",
        (d) => `translate(100, ${-d.radius * Math.sin(d.angle)})`
      );

    points
      .append("circle")
      .attr("cx", (d) => d.angle)
      .attr("cy", (d) => d.radius * radius)
      .attr("r", 5)
      .attr("fill", (d) => d.color);

    points
      .append("text")
      .attr("x", 10) // Ajusta la posición en x
      .attr("dy", "0.35em")
      .text((d) => d.label) // Utiliza la propiedad label para el texto
      .style("text-anchor", "start")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .style("fill", "rgb(72, 207, 135)");

    sections.on("click", handleClick);

    return () => {
      svg.selectAll("*").remove(); // Elimina los elementos del SVG al desmontar el componente
    };
  }, [selectedSection]);

  return (
    <>
      <span>{north}</span>
      <div id="chart" ref={chartRef}>
        <svg ref={svgRef}></svg>
      </div>
    </>
  );
}

export default RadarComponent;
