import { useRef, useState, useEffect } from "react";
import { compareByEndElevation } from "../../utils";

export const useRadarComponent = ({
  data,
  onClick,
  config: {
    radius = 200,
    numCircles = 9,
    colorCircles = "green",
    numLines = 24,
    opacityLines = 0.3,
    strokeLines = 1,
    colorLines = "green",
    circleStroke = 3,
    north = "N",
    northColor = "rgb(9, 115, 9)",
    northFontSize = (radius) => radius * 0.06,
    opacity = 0.4,
    sectionLabelFontSize = (radius) => radius * 0.06,
    sectionLabelFontWeight = "bold",
    sectionLabelDefaultColor = "rgb(100, 100, 100)",
    sectionLabelSelectedColor = "whitesmoke",
    selectedSectiondropShadowFilter = "drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.6))",
    unSelectedSectiondropShadowFilter = "drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.5))",
    sectionRectWidth = (radius) => radius * 0.08,
    sectionRectHeight = (radius) => radius * 0.08,
    sectionBorderStroke = (radius) => radius * 0.01,
    sectionStrokeColor = "white",
    sectionRecBorderSrtoke = (radius) => radius * 0.005,
    unselecteSectionRecColor = "white",
    selectedSectionRecBorderColor = "black",
    unselectedSectionRecBorderColor = "black",
    unSelectedSectionLabelShadow = "drop-shadow(0px 0px 0.7px rgba(0, 0, 0, 1))",
    pointLabelFontSize = (radius) => radius * 0.06,
    pointLabelFontWeight = "bold",
    pointLabelTextColor = "whitesmoke",
    pointLabelTextShadow = "0 0 1px black, 0 0 1px black",
    pointRectWidth = (radius) => radius * 0.04,
    pointRectHeight = (radius) => radius * 0.04,
    pointBorderStroke = 1.4,
    selectedPointRectborderShadow = (color) =>
      `drop-shadow(0px 0px 3px ${color})`,
    unSelectedPointRectborderShadow = "drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.5))",
    selectedPointStrokeColor = "white",
    pointRectRx = (radius) => radius * 0.08,
    pointRectRy = (radius) => radius * 0.08,
  },
  svgRef,
}) => {
  const [sectionsData, setSectionsData] = useState(data.sections);
  const [targetsData, settTargetsData] = useState(data.targets);
  const [selectedAngle, setSelectedAngle] = useState(true);
  const [positionClick, setPositionClick] = useState(0);
  const width = radius * 2;
  const height = width;
  const selectedAngleRef = useRef(selectedAngle);
  const positionClickRef = useRef(positionClick);

  if (sectionsData) {
    sectionsData.sort(compareByEndElevation);
  }
  if (targetsData) {
    targetsData.sort(compareByEndElevation);
  }

  const updateSelectedState = (dataArray, label) =>
    dataArray.map((data) => ({ ...data, selected: data.label === label }));

  const handleSectionClick = (event, d) => {
    const centerX = width / 2; // Ancho del gráfico dividido por 2
    const centerY = height / 2; // Alto del gráfico dividido por 2
    const x = event.x - centerX; // Distancia horizontal desde el centro
    const y = centerY - event.y; // Distancia vertical desde el centro (nota el signo negativo)

    // Calcular el ángulo en radianes

    const newSectionsData = updateSelectedState(sectionsData, d.data.label);
    if (targetsData) {
      const newTargetsData = updateSelectedState(targetsData, null); // Unselect all targets
      settTargetsData(newTargetsData);
    }
    setSectionsData(newSectionsData);
    const newSelectedSection = { ...d.data, selected: true };
    onClick(newSelectedSection);
  };

  const handleTargetsClick = (event, d) => {
    const newTargetsData = updateSelectedState(targetsData, d.data.label);
    if (sectionsData) {
      const newSectionsData = updateSelectedState(sectionsData, null); // Unselect all sections
      setSectionsData(newSectionsData);
    }
    settTargetsData(newTargetsData);
    const newSelectedTarget = { ...d.data, selected: true };
    onClick(newSelectedTarget);
  };

  const handleSectionDragStart = (event, d) => {
    const rad = Math.atan2(event.y, event.x);
    const deg = rad * (180 / Math.PI) + 90;
    setPositionClick(deg);
    const currentSelectedAngle = selectedAngleRef.current;

    const currentPositionClick = positionClickRef.current;
    console.log(
      rad,
      d.data.endElevation * (Math.PI / 180),
      d.data.startAngle * (Math.PI / 180)
    );
    const hp = Math.sqrt(Math.pow(event.y, 2) + Math.pow(event.x, 2));

    if (d.data.endAngle - deg < deg - d.data.startAngle) {
      setSelectedAngle(false);
    }
    if (d.data.endAngle - deg > deg - d.data.startAngle) {
      setSelectedAngle(true);
    }
  };

  const handleSectionDrag = (event, d) => {};
  const handleSectionDragEnd = (event, d) => {
    // console.log("drag", event, d);
    // Calcular el ángulo en radianes
    const x = event.x - width / 2;
    const y = height / 2 - event.y;
    const rad = Math.atan2(event.y, event.x);
    const deg = rad * (180 / Math.PI) + 90;
    const hp = Math.sqrt(Math.pow(event.y, 2) + Math.pow(event.x, 2));
    const hpMax = svgRef.current.getBoundingClientRect().width / 2;
    const radie = hp / hpMax;
    const obj = {
      rad: rad,
      deg: deg,
      x: event.x,
      y: event.y,
      radie: radie,
    };
    // console.log("obj input", obj);
    // Calcula el ángulo de inicio ajustado
    const newSections = sectionsData.map((section, index) => {
      //agregar index a data
      return {
        ...section,
        startAngle:
          index === d.index && selectedAngle ? obj.deg : section.startAngle,
        endAngle:
          index === d.index && !selectedAngle ? obj.deg : section.endAngle,
      };
    });
    setSectionsData(newSections);
    // El ángulo en radianes ahora está almacenado en 'angleInRadians'
  };

  const handleTargetDragEnd = (event, d) => {
    const x = event.x - width / 2;
    const y = height / 2 - event.y;
    const rad = Math.atan2(event.y, event.x);
    const deg = rad * (180 / Math.PI) + 90;
    const hp = Math.sqrt(Math.pow(event.y, 2) + Math.pow(event.x, 2));
    const hpMax = svgRef.current.getBoundingClientRect().width / 2;
    const radie = hp / hpMax;
    const obj = {
      rad: rad,
      deg: deg,
      x: event.x,
      y: event.y,
      radie: radie,
    };

    const newTargets = targetsData.map((target, index) => {
      return {
        ...target,
        angle: index === d.index ? obj.deg : target.angle,
        radius: index === d.index ? obj.radie : target.radius,
      };
    });
    settTargetsData(newTargets);
  };

  return {
    handleSectionClick,
    handleTargetsClick,
    handleSectionDragEnd,
    handleSectionDragStart,
    handleSectionDrag,
    handleTargetDragEnd,
    targetsData,
    sectionsData,
    width,
    height,
    radius,
    numCircles,
    colorCircles,
    numLines,
    opacityLines,
    strokeLines,
    colorLines,
    circleStroke,
    north,
    northColor,
    northFontSize,
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
  };
};

export default useRadarComponent;
