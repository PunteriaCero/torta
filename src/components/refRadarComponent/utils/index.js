export function generateBaseCircles(numCircles, color) {
  const baseCircles = [];

  for (let i = 0; i < numCircles; i++) {
    const radius = i / (numCircles - 1);
    baseCircles.push({ radius, color });
  }

  return baseCircles;
}

export function BaseCircles({ svg, radius, baseCircles }) {
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
}
