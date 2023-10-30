import * as d3 from 'd3';
function generateBaseCircles(numCircles, color) {
  const baseCircles = [];

  for (let i = 0; i < numCircles; i++) {
    const radius = i / (numCircles - 1);
    baseCircles.push({ radius, color });
  }

  return baseCircles;
}

export function BaseCircles({
  svg,
  numCircles,
  colorCircles,
  radius,
  strokeCircles,
}) {
  const baseCircles = generateBaseCircles(numCircles, colorCircles);
  const base = svg.append('g').attr('class', 'base');

  baseCircles.forEach((circle) => {
    base
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', circle.radius * (radius - 3))
      .attr('stroke', circle.color)
      .attr('stroke-width', strokeCircles)
      .attr('fill', 'none');
  });
}

export function BaseLines({
  lineAngles,
  radius,
  colorLines,
  strokeLines,
  opacityLines,
  svg,
}) {
  // Dibujar líneas desde el centro hasta el radio especificado
  lineAngles.forEach((angle) => {
    const x2 = Math.cos(angle) * radius;
    const y2 = Math.sin(angle) * (-radius + 1.5);
    svg
      .append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', x2)
      .attr('y2', y2)
      .attr('stroke', colorLines)
      .attr('stroke-width', strokeLines)
      .attr('opacity', opacityLines);
  });
}

export function compareByEndElevation(a, b) {
  return a.endElevation - b.endElevation;
}

export const setPositionCircle = (newSection, reference, start) => {
  const circleStart = d3.select(reference.classSelectStart);
  const circleEnd = d3.select(reference.classSelectEnd);
  if (start) {
    const { cxStart, cyStart } = getCoordinatesCircles(newSection);
    if (circleStart) {
      circleStart.attr('cx', cxStart).attr('cy', cyStart);
    }
  } else {
    const { cxEnd, cyEnd } = getCoordinatesCircles(newSection);
    if (circleEnd) {
      circleEnd.attr('cx', cxEnd).attr('cy', cyEnd);
    }
  }
};

export const getCoordinatesCircles = (data) => {
  const outerRadius = data.outerRadius * 280; // Convert relative radius to actual pixels

  // Calculate start point coordinates
  const cxStart =
    280 + outerRadius * Math.cos((data.startAngle * Math.PI - 280) / 180);
  const cyStart =
    280 + outerRadius * Math.sin((data.startAngle * Math.PI - 280) / 180);

  // Calculate end point coordinates
  const cxEnd =
    280 + outerRadius * Math.cos((data.endAngle * Math.PI - 280) / 180);
  const cyEnd =
    280 + outerRadius * Math.sin((data.endAngle * Math.PI - 280) / 180);

  return { cxStart, cyStart, cxEnd, cyEnd };
};

export const generateReferencesDOM = (section) => {
  let referencesClass = {
    classStart: `start-circle item-${section.label}`,
    classEnd: `end-circle item-${section.label}`,
    classSelectStart: `.start-circle.item-${section.label}`,
    classSelectEnd: `.end-circle.item-${section.label}`,
  };

  referencesClass['existCircleStart'] = d3
    .select(referencesClass.classSelectStart)
    .node();
  referencesClass['existCircleEnd'] = d3
    .select(referencesClass.classSelectEnd)
    .node();

  return referencesClass;
};

export const addCirclesSVG = (section, drag, reference) => {
  const svg = d3.select('svg');
  const { cxStart, cyStart, cxEnd, cyEnd } = getCoordinatesCircles(section);

  if (!reference.existCircleStart) {
    let startCircle = svg
      .append('circle')
      .attr('class', reference.classStart)
      .attr('r', 8);
    startCircle.attr('cx', cxStart).attr('cy', cyStart);
    startCircle.call(drag);
  }
  if (!reference.existCircleEnd) {
    let endCircle = svg
      .append('circle')
      .attr('class', reference.classEnd)
      .attr('r', 8);
    endCircle.attr('cx', cxEnd).attr('cy', cyEnd);
    endCircle.call(drag);
  }
};