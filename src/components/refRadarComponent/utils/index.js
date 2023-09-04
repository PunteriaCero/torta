import * as d3 from "d3";

export function generateBaseCircles(numCircles, color) {
  const baseCircles = [];

  for (let i = 0; i < numCircles; i++) {
    const radius = i / (numCircles - 1);
    baseCircles.push({ radius, color });
  }

  return baseCircles;
}

export function renderBaseCircles({ svg, radius, strokeCircles, baseCircles }) {
  const base = svg.append("g").attr("class", "base");

  baseCircles.forEach((circle) => {
    base
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", circle.radius * (radius-3))
      .attr("stroke", circle.color)
      .attr("stroke-width", strokeCircles)
      .attr("fill", "none");
  });
}

export function renderBaseLines({svg, numLines, radius, colorLines, strokeLines, opacityLines}) {
  // Definir ángulos para las líneas desde el centro hasta el radio máximo
  const lineAngles = d3
  .range(numLines)
  .map((i) => ((i * 360) / numLines) * (Math.PI / 180));

// Dibujar líneas desde el centro hasta el radio especificado
lineAngles.forEach((angle) => {
  const x2 = Math.cos(angle) * radius;
  const y2 = Math.sin(angle) * (- radius + 1.5);

  svg
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", x2)
    .attr("y2", y2)
    .attr("stroke", colorLines)
    .attr("stroke-width", strokeLines)
    .attr("opacity", opacityLines);
});
}

export function compareByEndElevation(a, b) {
  return a.endElevation - b.endElevation;
}
