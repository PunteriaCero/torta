import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { BaseCircles, BaseLines } from '../utils/index.js';
import useRadarComponent from '../hooks/useRadarHooks';
import PropTypes from 'prop-types';

function RadarComponent({
  sections,
  setSections,
  targets,
  setTargets,
  showSections,
  onClick,
  onDrag,
  config,
}) {
  const svgRef = useRef(null);
  const initialConfig = useRadarComponent({
    sections,
    setSections,
    targets,
    setTargets,
    onClick,
    onDrag,
    config,
    svgRef,
  });
  const radarConfigRef = useRef(initialConfig);
  const { northColor, northFontSize, radius, north } = radarConfigRef.current;
  const styles = {
    body: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'calc(10px + 2vmin)',
    },
  };

  useEffect(() => {
    const {
      handleSectionClick,
      handleTargetsClick,
      width,
      height,
      radius,
      numCircles,
      colorCircles,
      numLines,
      opacityLines,
      strokeLines,
      colorLines,
      strokeCircles,
      opacity,
      sectionLabelFontSize,
      sectionLabelFontWeight,
      sectionLabelDefaultColor,
      sectionLabelSelectedColor,
      selectedSectiondropShadowFilter,
      unSelectedSectiondropShadowFilter,
      sectionRectWidth,
      sectionRectHeight,
      sectionBorderStroke,
      sectionStrokeColor,
      sectionRecBorderSrtoke,
      unselecteSectionRecColor,
      selectedSectionRecBorderColor,
      unselectedSectionRecBorderColor,
      unSelectedSectionLabelShadow,
      pointLabelFontSize,
      pointLabelFontWeight,
      pointLabelTextColor,
      pointLabelTextShadow,
      pointRectWidth,
      pointRectHeight,
      pointBorderStroke,
      selectedPointRectborderShadow,
      unSelectedPointRectborderShadow,
      selectedPointStrokeColor,
      pointRectRx,
      pointRectRy,
    } = initialConfig;

    // Check if a <g> element with class "radar-component" already exists
    let svg = d3.select('g.radar-component');

    if (svg.empty()) {
      // If it doesn't exist, create a new one
      svg = d3
        .select(svgRef.current)
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('class', 'radar-component')
        // Select SVG element via reference and set its width and height attributes
        .attr('transform', `translate(${width / 2}, ${height / 2})`);
    }

    // Generate circles
    BaseCircles({ svg, numCircles, colorCircles, radius, strokeCircles });

    // Define angles for lines from center to maximum radius
    const lineAngles = d3.range(numLines).map((i) => {
      return ((i * 360) / numLines) * (Math.PI / 180);
    });

    BaseLines({
      lineAngles,
      radius,
      colorLines,
      strokeLines,
      opacityLines,
      svg,
    });

    // Create a pie() builder
    const pie = d3
      .pie()
      .value((d) => d.value)
      .sort(null);

    // If there are sections and the view is enabled, they are rendered on the radar
    if (sections && showSections) {
      // Select all "arc" groups and bind data for sections
      const sectionsSvg = svg
        .selectAll('.arc')
        .data(pie(sections))
        .enter()
        .append('g')
        .attr('id', (d) => `section-${d.index}`)
        .on('click', handleSectionClick);

      // Define an arc generator for the sections
      const path = d3
        .arc()
        .outerRadius((d) => d.data.outerRadius * (radius - 3))
        .innerRadius((d) => d.data.innerRadius * radius)
        .startAngle((d) =>
          d.data.startAngle > d.data.endAngle
            ? (d.data.startAngle - 360) * (Math.PI / 180)
            : d.data.startAngle * (Math.PI / 180)
        )
        .endAngle((d) => d.data.endAngle * (Math.PI / 180));

      // Add path elements to sections
      sectionsSvg
        .append('path')
        .attr('d', path)
        .attr('fill', (d) => d.data.color)
        .attr('fill-opacity', opacity)
        .style('cursor', 'pointer')
        .style('filter', (d) =>
          d.data.selected
            ? selectedSectiondropShadowFilter
            : unSelectedSectiondropShadowFilter
        )
        .attr('stroke', (d) =>
          d.data.selected ? sectionStrokeColor : d.data.color
        )
        .attr('stroke-width', sectionBorderStroke(radius));

      // Add rectangles as background for section labels
      sectionsSvg
        .append('rect')
        .attr('x', (d) => {
          const centroid = path.centroid(d);
          return centroid[0] - radius * 0.058;
        })
        .attr('y', (d) => {
          const centroid = path.centroid(d);
          return centroid[1] - radius * 0.054;
        })
        .attr('width', sectionRectWidth(radius))
        .attr('height', sectionRectHeight(radius))
        .attr('fill', (d) =>
          d.data.selected ? unselecteSectionRecColor : d.data.color
        )
        .attr('rx', radius * 0.02)
        .attr('ry', radius * 0.02)
        .style('cursor', 'pointer')
        .attr('stroke', (d) =>
          d.data.selected
            ? selectedSectionRecBorderColor
            : unselectedSectionRecBorderColor
        )
        .attr('stroke-width', sectionRecBorderSrtoke(radius));

      // Add text elements for section labels
      sectionsSvg
        .append('text')
        .attr('transform', (d) => {
          const centroid = path.centroid(d);
          return `translate(${centroid})`;
        })
        .attr('dy', '0.1em')
        .attr('dx', '-0.3em')
        .text((d) => d.data.label)
        .style('cursor', 'pointer')
        .style('text-anchor', 'middle')
        .style('font-size', sectionLabelFontSize(radius))
        .style('font-weight', sectionLabelFontWeight)
        .style('fill', (d, i) =>
          d.data.selected ? sectionLabelDefaultColor : sectionLabelSelectedColor
        )
        .style('filter', (d) =>
          d.data.selected ? '' : unSelectedSectionLabelShadow
        );
    }

    // If targets exist and the view is enabled, they are rendered on the radar
    if (targets && !showSections) {
      // Define an arc generator for the points
      const pathPoint = d3
        .arc()
        .outerRadius((d) => d.data.radius * radius)
        .innerRadius((d) => d.data.radius * radius)
        .startAngle((d) => d.data.angle * (Math.PI / 180))
        .endAngle((d) => d.data.angle * (Math.PI / 180));

      // Select all "arc" groups and bind the data to the points
      const point = svg
        .selectAll('.arc')
        .data(pie(targets))
        .enter()
        .append('g')
        .attr('id', (d) => `target-${d.index}`)
        .on('click', handleTargetsClick);

      // Add path elements to points
      point
        .append('path')
        .attr('d', pathPoint)
        .attr('fill', (d) => (d.selected ? d.data.color : 'transparent'))
        .attr('stroke', 'white')
        .attr('stroke-width', 2);

      // Add rectangles as background for point labels
      point
        .append('rect')
        .attr('x', (d) => {
          const centroid = pathPoint.centroid(d);
          return centroid[0] - 3;
        })
        .attr('y', (d) => {
          const centroid = pathPoint.centroid(d);
          return centroid[1] - 3;
        })
        .attr('width', pointRectWidth(radius))
        .attr('height', pointRectHeight(radius))
        .style('filter', (d) =>
          d.data.selected
            ? selectedPointRectborderShadow(d.data.color)
            : unSelectedPointRectborderShadow
        )
        .attr('fill-opacity', (d) => (d.data.selected ? '1' : '0.7'))
        .attr('fill', (d) => d.data.color)
        .attr('rx', pointRectRx(radius))
        .attr('ry', pointRectRy(radius))
        .style('cursor', 'pointer')
        .attr('stroke', (d) =>
          d.data.selected ? selectedPointStrokeColor : d.data.color
        )
        .attr('stroke-width', pointBorderStroke);

      // Add text elements for point labels
      point
        .append('text')
        .attr('transform', (d) => {
          const centroid = pathPoint.centroid(d);
          return `translate(${centroid})`;
        })
        .attr('dy', '0.34em')
        .attr('dx', radius * 0.05)
        .text((d) => d.data.label)
        .style('font-size', pointLabelFontSize(radius))
        .style('text-shadow', pointLabelTextShadow)
        .style('font-weight', pointLabelFontWeight)
        .style('cursor', 'pointer')
        .style('fill', pointLabelTextColor);
      // point.on('click', handleTargetsClick);
      //point.call(d3.drag().on('end', handleTargetDragEnd));
    }

    // Cleanup function to remove all elements from the SVG when unmounting the component
    return () => {
      svg.selectAll('*').remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialConfig]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let isExecuted = false;

      if (!isExecuted && showSections) {
        const selectedSection = sections.findIndex(
          (item) => item.selected === true
        );

        const circleElement = d3.select(`#section-${selectedSection}`).node();

        if (circleElement) {
          d3.select(circleElement).dispatch('click');
        }
        isExecuted = true;
      } else if (!isExecuted && !showSections) {
        const selectedTarget = targets.findIndex(
          (item) => item.selected === true
        );
        console.log(selectedTarget);
        const circleElement = d3.select(`#target-${selectedTarget}`).node();

        if (circleElement) {
          d3.select(circleElement).dispatch('click');
        }
        isExecuted = true;
      }
    }, 0);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div style={styles.body} id="chart">
        <span
          style={{
            color: northColor,
            fontSize: northFontSize(radius),
            fontWeight: 'bold',
          }}
        >
          {north}
        </span>
        <svg width="800px" ref={svgRef}></svg>
      </div>
    </>
  );
}
RadarComponent.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      startAngle: PropTypes.number.isRequired,
      endAngle: PropTypes.number.isRequired,
      innerRadius: PropTypes.number.isRequired,
      outerRadius: PropTypes.number.isRequired,
      startElevation: PropTypes.number.isRequired,
      endElevation: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  setSections: PropTypes.func,
  targets: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      angle: PropTypes.number.isRequired,
      radius: PropTypes.number.isRequired,
      elevation: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
    })
  ).isRequired,
  settTargets: PropTypes.func,
  showSections: PropTypes.bool,
  onClick: PropTypes.func,
  onDrag: PropTypes.func,
  config: PropTypes.shape({
    radius: PropTypes.string.isRequired,
    colorCircles: PropTypes.string.isRequired,
    strokeLines: PropTypes.number.isRequired,
    strokeCircles: PropTypes.number.isRequired,
  }).isRequired,
};
export default RadarComponent;
