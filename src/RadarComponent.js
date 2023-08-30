import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import "./App.css";

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
  onClick, 
  radius = 200,
  numCircles = 9,
  colorCircles = "green",
  numLines = 24,
  colorLines = "green",
  north = "N",
  opacity = 0.4,
}) {
  const [sectionsData, setSectionsData] = useState(data.sections);
  const [targetsData, settTargetsData] = useState(data.targets);

  const handleClick = (event, d) => {
    const newSectionsData = sectionsData.map((value) => ({
      ...value,
      selected: value.label === d.data.label ? true : false,
    }));
  
    // Set all targets' selected to false
    const newTargetsData = targetsData.map((value) => ({
      ...value,
      selected: false,
    }));
  
    setSectionsData(newSectionsData);
    settTargetsData(newTargetsData);
    d.data.selected = true;
    onClick(d.data);
  };
  
  const handleTargetsClick = (event, d) => {
    const newTargetsData = targetsData.map((value) => ({
      ...value,
      selected: value.label === d.data.label ? true : false,
    }));
  
    // Set all sections' selected to false
    const newSectionsData = sectionsData.map((value) => ({
      ...value,
      selected: false,
    }));
  
    settTargetsData(newTargetsData);
    setSectionsData(newSectionsData);
    d.data.selected = true;
    onClick(d.data);
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
      .startAngle((d) => d.data.startAngle > d.data.endAngle ? ((d.data.startAngle - 360) * (Math.PI / 180)) : (d.data.startAngle * (Math.PI / 180)) ) // Se convierte de Grados a Radianes
      .endAngle((d) => d.data.endAngle * (Math.PI / 180)); // Se convierte de Grados a Radianes

    const sections = svg
      .selectAll(".arc")
      .data(pie(sectionsData))
      .enter()
      .append("g");
    sections
      .append("path")
      .attr("d", path)
      .attr("fill", (d) => (d.data.color))
      .attr("fill-opacity", opacity)
      .style("cursor", "pointer")
      .style('filter', (d) => (d.data.selected ? "drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.6))" : "drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.5))"))
      .attr("stroke", (d) => (d.data.selected ? "white" : d.data.color))
      .attr("stroke-width", 2);

    sections
      .append("rect") // Agregar rectángulo como fondo de la etiqueta
      .attr("x", (d) => {
        const centroid = path.centroid(d);
        return centroid[0] - 11.5; // Ajusta la posición en x
      })
      .attr("y", (d) => {
        const centroid = path.centroid(d);
        return centroid[1] - 11; // Ajusta la posición en y
      })
      .attr("width", radius * 0.08) // Ancho del rectángulo
      .attr("height", radius * 0.08) // Altura del rectángulo
      .attr("fill", (d) => (d.data.selected ? d.data.color : "white")) // Color del fondo -- En caso de estar seleccionado debe ser verde
      .attr("rx", 4) // Radio horizontal de las esquinas
      .style("cursor", "pointer")
      .attr("stroke", (d) => (d.data.selected ? "black" : "white")) // En caso de estar seleccionado debe ser negro
      .attr("stroke-width", 0.7); // Radio vertical de las esquinas
    // .attr("class", (d, i) => `arc ${data.selected ? "selected" : ""}`);

    sections
      .append("text")
      .attr("transform", (d) => {
        const centroid = path.centroid(d);
        return `translate(${centroid})`;
      })

      .attr("dy", "0.1em")
      .attr("dx", "-0.3em")
      .text((d) => d.data.label)
      .style("cursor", "pointer")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", (d, i) => (d.data.selected ? "whitesmoke" : "rgb(100,100,100)"));
    ///////////////////////

    const pathPoint = d3
      .arc()
      .outerRadius((d) => d.data.radius * radius) // En caso de que venga un valor de 0 a 1, se multiplica por el radio maximo para que sea porcentual
      .innerRadius((d) => d.data.radius * radius)
      .startAngle((d) => d.data.angle * (Math.PI / 180)) // Se convierte de Grados a Radianes
      .endAngle((d) => d.data.angle * (Math.PI / 180)); // Se convierte de Grados a Radianes

    const point = svg
      .selectAll(".arc")
      .data(pie(targetsData))
      .enter()
      .append("g");
    //.attr(
    //    "class",
    //    (d, i) => `arc ${data.selected ? "selected" : ""}`
    //);

    point
      .append("path")
      .attr("d", pathPoint)
      .attr("fill", (d) => (d.selected ? d.data.color : "transparent"))
      .attr("stroke", "white")
      .attr("stroke-width", 2);

    point
      .append("rect") // Agregar rectángulo como fondo de la etiqueta
      .attr("x", (d) => {
        const centroid = pathPoint.centroid(d);
        return centroid[0] - 3; // Ajusta la posición en x
      })
      .attr("y", (d) => {
        const centroid = pathPoint.centroid(d);
        return centroid[1] - 3; // Ajusta la posición en y
      })
      .attr("width", radius * 0.03) // Ancho del rectángulo
      .attr("height", radius * 0.03) // Altura del rectángulo      
      .style('filter', (d) => (d.data.selected ? `drop-shadow(0px 0px 3px ${d.data.color})` : "drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.5))"))
      .attr("fill-opacity", (d) => (d.data.selected ? "1" : "0.7"))
      .attr("fill", (d) => (d.data.color)) // Color del fondo -- En caso de estar seleccionado debe ser del color que tiene el target
      .attr("rx", 12) // Radio horizontal de las esquinas
      .attr("ry", 12)
      .style("cursor", "pointer")
      .attr("stroke", (d) => (d.data.selected ?  "white" : d.data.color)) //-- En caso de estar seleccionado debe ser verde
      .attr("stroke-width", 1.4); // Radio vertical de las esquinas

    point
      .append("text")
      .attr("transform", (d) => {
        const centroid = pathPoint.centroid(d);
        return `translate(${centroid})`;
      })
      .attr("dy", "0.34em")
      .attr("dx", "0.6em")
      .text((d) => d.data.label)
      .style("font-size", "12px")
      .style("text-shadow", "0 0 1px black, 0 0 1px black")
      .style("font-weight", "bold")
      .style("cursor", "pointer")
      .style("fill", "whitesmoke");

    sections.on("click", handleClick);
    point.on("click", handleTargetsClick);

    return () => {
      svg.selectAll("*").remove(); // Elimina los elementos del SVG al desmontar el componente
    };
  }, [sectionsData, targetsData]);

  return (
    <>
      <span>{north}</span>
      <div id="chart" ref={chartRef} >
        <svg ref={svgRef}></svg>
      </div>
    </>
  );
}

export default RadarComponent;
