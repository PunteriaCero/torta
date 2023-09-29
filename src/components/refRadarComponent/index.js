import React, { useRef, useEffect } from "react";
import { BaseCircles, BaseLines } from "./utils";
import useRadarComponent from "./hooks/useRadarComponent";
import {
  useItemSelector,
  useSectionsSelector,
  useTargetsSelector,
} from "../../redux/hooks/dataHooks";
import * as d3 from "d3";
import { useDispatch } from "react-redux";
import { saveItem, saveSections } from "../../redux/slices/dataSlice";

function RadarComponent({ config }) {
  const svgRef = useRef(null);
  const dispatch = useDispatch();
  const sectionsData = useSectionsSelector();
  const targetsData = useTargetsSelector();
  const initialConfig = useRadarComponent({ config, svgRef });
  const radarConfigRef = useRef(initialConfig);
  const { northColor, northFontSize, radius, north } = radarConfigRef.current;
  const styles = {
    body: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "calc(10px + 2vmin)",
    },
  };

  let selectedSlice = useItemSelector();
  let isResizing = false;

  useEffect(() => {
    const {
      handleSectionClick,
      handleSectionDoubleClick,
      handleTargetsClick,
      handleMouseDown,
      handleMouseUp,
      handleMouseMove,
      handleSectionDragEnd,
      handleSectionDragStart,
      handleSectionDrag,
      handleTargetDragEnd,
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

    // Seleccionar el elemento SVG a través de la referencia y establecer sus atributos de ancho y alto
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Generar circulos
    BaseCircles({ svg, numCircles, colorCircles, radius, strokeCircles });

    // Definir ángulos para las líneas desde el centro hasta el radio máximo
    const lineAngles = d3.range(numLines).map((i) => {
      // console.log("i", i);
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

    // Crear un generador de pie
    const pie = d3
      .pie()
      .value((d) => d.value)
      .sort(null);

    // Si existen sections se renderizan en el radar
    if (sectionsData) {
      // Seleccionar todos los grupos "arc" y enlazar los datos para las secciones
      const sections = svg
        .selectAll(".arc")
        .data(pie(sectionsData))
        .enter()
        .append("g")
        .on("mousedown", handleMouseDown)
        .on("mouseup", handleMouseUp)
        .on("mousemove", handleMouseMove)
        .on("click", handleSectionClick)
        .on("dblclick", handleSectionDoubleClick);

      // Definir un generador de arco para las secciones
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

      const svgElement = svgRef.current;

      // Obtén las coordenadas del extremo superior izquierdo del SVG
      const svgBounds = svgElement.getBoundingClientRect();
      // Agregar elementos de tipo "path" para las secciones
      sections
        .append("path")
        .attr("d", path)
        .attr("fill", (d) => d.data.color)
        .attr("fill-opacity", opacity)
        .style("cursor", "pointer")
        .style("filter", (d) =>
          d.data.selected
            ? selectedSectiondropShadowFilter
            : unSelectedSectiondropShadowFilter
        )
        .attr("stroke", (d) =>
          d.data.selected ? sectionStrokeColor : d.data.color
        )
        .attr("stroke-width", sectionBorderStroke(radius));

      // Agregar rectángulos como fondo para las etiquetas de las secciones
      sections
        .append("rect")
        .attr("x", (d) => {
          const centroid = path.centroid(d);
          return centroid[0] - radius * 0.058;
        })
        .attr("y", (d) => {
          const centroid = path.centroid(d);
          return centroid[1] - radius * 0.054;
        })
        .attr("width", sectionRectWidth(radius))
        .attr("height", sectionRectHeight(radius))
        .attr("fill", (d) =>
          d.data.selected ? unselecteSectionRecColor : d.data.color
        )
        .attr("rx", radius * 0.02)
        .attr("ry", radius * 0.02)
        .style("cursor", "pointer")
        .attr("stroke", (d) =>
          d.data.selected
            ? selectedSectionRecBorderColor
            : unselectedSectionRecBorderColor
        )
        .attr("stroke-width", sectionRecBorderSrtoke(radius));

      // Agregar elementos de texto para las etiquetas de las secciones
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
        .style("font-size", sectionLabelFontSize(radius))
        .style("font-weight", sectionLabelFontWeight)
        .style("fill", (d, i) =>
          d.data.selected ? sectionLabelDefaultColor : sectionLabelSelectedColor
        )
        .style("filter", (d) =>
          d.data.selected ? "" : unSelectedSectionLabelShadow
        );
      // Establecer manejadores de eventos de clic para las secciones y los puntos
      // sections
      //   .on('click', handleSectionClick)
      //   .on('dblclick', handleSectionDoubleClick);

      // sections.call(
      //   d3
      //     .drag()
      //     .on('start', handleSectionDragStart)
      //     .on('drag', handleSectionDrag)
      //     .on('end', handleSectionDragEnd)
      // );
    }

    // Si existen targets se renderizan en el radar
    if (targetsData) {
      // Definir un generador de arco para los puntos
      const pathPoint = d3
        .arc()
        .outerRadius((d) => d.data.radius * radius)
        .innerRadius((d) => d.data.radius * radius)
        .startAngle((d) => d.data.angle * (Math.PI / 180))
        .endAngle((d) => d.data.angle * (Math.PI / 180));

      // Seleccionar todos los grupos "arc" y enlazar los datos para los puntos
      const point = svg
        .selectAll(".arc")
        .data(pie(targetsData))
        .enter()
        .append("g");

      // Agregar elementos de tipo "path" para los puntos
      point
        .append("path")
        .attr("d", pathPoint)
        .attr("fill", (d) => (d.selected ? d.data.color : "transparent"))
        .attr("stroke", "white")
        .attr("stroke-width", 2);

      // Agregar rectángulos como fondo para las etiquetas de los puntos
      point
        .append("rect")
        .attr("x", (d) => {
          const centroid = pathPoint.centroid(d);
          return centroid[0] - 3;
        })
        .attr("y", (d) => {
          const centroid = pathPoint.centroid(d);
          return centroid[1] - 3;
        })
        .attr("width", pointRectWidth(radius))
        .attr("height", pointRectHeight(radius))
        .style("filter", (d) =>
          d.data.selected
            ? selectedPointRectborderShadow(d.data.color)
            : unSelectedPointRectborderShadow
        )
        .attr("fill-opacity", (d) => (d.data.selected ? "1" : "0.7"))
        .attr("fill", (d) => d.data.color)
        .attr("rx", pointRectRx(radius))
        .attr("ry", pointRectRy(radius))
        .style("cursor", "pointer")
        .attr("stroke", (d) =>
          d.data.selected ? selectedPointStrokeColor : d.data.color
        )
        .attr("stroke-width", pointBorderStroke);

      // Agregar elementos de texto para las etiquetas de los puntos
      point
        .append("text")
        .attr("transform", (d) => {
          const centroid = pathPoint.centroid(d);
          return `translate(${centroid})`;
        })
        .attr("dy", "0.34em")
        .attr("dx", radius * 0.05)
        .text((d) => d.data.label)
        .style("font-size", pointLabelFontSize(radius))
        .style("text-shadow", pointLabelTextShadow)
        .style("font-weight", pointLabelFontWeight)
        .style("cursor", "pointer")
        .style("fill", pointLabelTextColor);
      point.on("click", handleTargetsClick);
      point.call(d3.drag().on("end", handleTargetDragEnd));
    }

    // Función de limpieza para eliminar todos los elementos del SVG al desmontar el componente
    return () => {
      svg.selectAll("*").remove();
    };
  }, [initialConfig]);

  return (
    <>
      <div style={styles.body} id="chart">
        <span
          style={{
            color: northColor,
            fontSize: northFontSize(radius),
            fontWeight: "bold",
          }}
        >
          {north}
        </span>
        <svg width="800px" ref={svgRef}></svg>
      </div>
    </>
  );
}
RadarComponent.defaultProps = {
  config: {},
};
export default RadarComponent;
