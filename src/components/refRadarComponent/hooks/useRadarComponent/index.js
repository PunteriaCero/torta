import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  saveItem,
  saveSections,
  saveTargets,
} from '../../../../redux/slices/dataSlice';
import {
  useItemSelector,
  useSectionsSelector,
  useTargetsSelector,
} from '../../../../redux/hooks/dataHooks';
import * as d3 from 'd3';

export const useRadarComponent = ({
  config: {
    radius = 200,
    numCircles = 9,
    colorCircles = 'green',
    numLines = 24,
    opacityLines = 0.3,
    strokeLines = 1,
    colorLines = 'green',
    circleStroke = 3,
    north = 'N',
    northColor = 'rgb(9, 115, 9)',
    northFontSize = (radius) => radius * 0.06,
    opacity = 0.4,
    sectionLabelFontSize = (radius) => radius * 0.06,
    sectionLabelFontWeight = 'bold',
    sectionLabelDefaultColor = 'rgb(100, 100, 100)',
    sectionLabelSelectedColor = 'whitesmoke',
    selectedSectiondropShadowFilter = 'drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.6))',
    unSelectedSectiondropShadowFilter = 'drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.5))',
    sectionRectWidth = (radius) => radius * 0.08,
    sectionRectHeight = (radius) => radius * 0.08,
    sectionBorderStroke = (radius) => radius * 0.01,
    sectionStrokeColor = 'white',
    sectionRecBorderSrtoke = (radius) => radius * 0.005,
    unselecteSectionRecColor = 'white',
    selectedSectionRecBorderColor = 'black',
    unselectedSectionRecBorderColor = 'black',
    unSelectedSectionLabelShadow = 'drop-shadow(0px 0px 0.7px rgba(0, 0, 0, 1))',
    pointLabelFontSize = (radius) => radius * 0.06,
    pointLabelFontWeight = 'bold',
    pointLabelTextColor = 'whitesmoke',
    pointLabelTextShadow = '0 0 1px black, 0 0 1px black',
    pointRectWidth = (radius) => radius * 0.04,
    pointRectHeight = (radius) => radius * 0.04,
    pointBorderStroke = 1.4,
    selectedPointRectborderShadow = (color) =>
      `drop-shadow(0px 0px 3px ${color})`,
    unSelectedPointRectborderShadow = 'drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.5))',
    selectedPointStrokeColor = 'white',
    pointRectRx = (radius) => radius * 0.08,
    pointRectRy = (radius) => radius * 0.08,
  },
  svgRef,
}) => {
  let isResizing = false;
  const dispatch = useDispatch();
  const sectionsRedux = useSectionsSelector();
  const targetsRedux = useTargetsSelector();
  let selectedSlice = useItemSelector();
  //const isResizing = useResizeSelector();
  //const [sectionsData, setSectionsData] = useState(data.sections);
  //const [targetsData, settTargetsData] = useState(data.targets);
  const [selectedAngle, setSelectedAngle] = useState(true);
  const [positionClick, setPositionClick] = useState(0);
  const [angleCustom, setAngleCustom] = useState(0);
  const width = radius * 2;
  const height = width;
  const selectedAngleRef = useRef(selectedAngle);
  const positionClickRef = useRef(positionClick);

  const updateSelectedState = (dataArray, label) =>
    dataArray.map((data) => ({ ...data, selected: data.label === label }));

  const handleSectionClick = (event, d) => {
    event.stopPropagation();
    const newSectionsData = updateSelectedState(sectionsRedux, d.data.label);
    if (targetsRedux) {
      const newTargetsData = updateSelectedState(targetsRedux, null); // Unselect all targets
      //settTargetsData(newTargetsData);
    }
    const newSection = newSectionsData.find(
      (section) => section.selected === true
    );
    dispatch(saveItem(newSection));
    dispatch(saveSections(newSectionsData));
    resetCircles(newSectionsData);

    const drag = d3
      .drag()
      .on('start', function (event) {
        d3.select(this).raise(); // Bring the dragged element to the front
      })
      .on('end', function (event) {
        const degrees = getDegreesByEvent(event.x, event.y);
        if (d3.select(this).classed(classStart)) {
          selectedSlice = { ...selectedSlice, startAngle: degrees };
          const { cxStart, cyStart } = getCoordinatesCircles(selectedSlice);
          const circleStart = d3.select(classSelectStart);
          if (circleStart) circleStart.attr('cx', cxStart).attr('cy', cyStart);
        } else if (d3.select(this).classed(classEnd)) {
          selectedSlice = { ...selectedSlice, endAngle: degrees };
          const { cxEnd, cyEnd } = getCoordinatesCircles(selectedSlice);
          const circleEnd = d3.select(classSelectEnd);
          if (circleEnd) circleEnd.attr('cx', cxEnd).attr('cy', cyEnd);
        }
      })
      .on('drag', function (event) {
        const degrees = getDegreesByEvent(event.x, event.y);
        if (d3.select(this).classed(classStart)) {
          updateReduxAngles(degrees, d.data.label);
          console.log(selectedSlice);
        } else if (d3.select(this).classed(classEnd)) {
          updateReduxAngles(degrees, d.data.label, false);
        }
      });

    const svg = d3.select('svg');
    const classStart = `start-circle item-${d.data.label}`;
    const classEnd = `end-circle item-${d.data.label}`;
    const classSelectStart = `.start-circle.item-${d.data.label}`;
    const classSelectEnd = `.end-circle.item-${d.data.label}`;
    const existCircleStart = d3.select(classSelectStart).node();
    const existCircleEnd = d3.select(classSelectEnd).node();

    const { cxStart, cyStart, cxEnd, cyEnd } = getCoordinatesCircles(d.data);

    if (!existCircleStart) {
      const startCircle = svg
        .append('circle')
        .attr('class', classStart)
        .attr('r', 8);
      startCircle.attr('cx', cxStart).attr('cy', cyStart);
      startCircle.call(drag);
    }
    if (!existCircleEnd) {
      const endCircle = svg
        .append('circle')
        .attr('class', classEnd)
        .attr('r', 8);
      endCircle.attr('cx', cxEnd).attr('cy', cyEnd);
      endCircle.call(drag);
    }
  };

  const resetCircles = (data) => {
    data.forEach((item) => {
      if (!item.selected) {
        const circleElements = d3.selectAll(`.item-${item.label}`).nodes();
        circleElements.forEach((circleElement) => {
          d3.select(circleElement).remove();
        });
      }
    });
  };

  const getCoordinatesCircles = (data) => {
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

  const getDegreesByEvent = (x, y) => {
    const angle = Math.atan2(y - height / 2, x - width / 2);
    let degrees = (angle * 180) / Math.PI + 90;

    if (degrees < 0) {
      degrees += 360;
    }
    return degrees;
  };

  const updateReduxAngles = (degrees, label, start = true) => {
    let newSectionsData = updateSelectedState(sectionsRedux, label).map(
      (item) => {
        if (item.selected) {
          if (start) {
            return { ...item, startAngle: degrees };
          } else {
            return { ...item, endAngle: degrees };
          }
        } else {
          return item;
        }
      }
    );
    dispatch(saveSections(newSectionsData));

    dispatch(
      saveItem(
        start
          ? { ...selectedSlice, startAngle: degrees }
          : { ...selectedSlice, endAngle: degrees }
      )
    );
  };

  const handleTargetsClick = (event, d) => {
    const newTargetsData = updateSelectedState(targetsRedux, d.data.label);
    if (sectionsRedux) {
      const newSectionsData = updateSelectedState(sectionsRedux, null); // Unselect all sections
      //setSectionsData(newSectionsData);
    }
    dispatch(
      saveItem(newTargetsData.find((target) => target.selected === true))
    );
    // settTargetsData(newTargetsData);
  };

  const handleSectionDragStart = (event, d) => {
    const rad = Math.atan2(event.y, event.x);
    console.log(`dragStart+${rad}`);
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
    console.log('dragEnd', event, d);
    // Calcular el ángulo en radianes
    // const x = event.x - width / 2;
    // const y = height / 2 - event.y;
    // console.log(selectedAngleRef.current);
    // // Calcula el ángulo actual basado en las coordenadas del mouse
    // // const currentAngle = (Math.atan2(y, x) * 180) / Math.PI;
    // // const angleDifference = currentAngle - d.startAngle;
    // const rad = Math.atan2(event.y, event.x);
    // const deg = rad * (180 / Math.PI) + 90;
    // const hp = Math.sqrt(Math.pow(event.y, 2) + Math.pow(event.x, 2));
    // const hpMax = svgRef.current.getBoundingClientRect().width / 2;
    // const radie = hp / hpMax;
    // const obj = {
    //   rad: rad,
    //   deg: deg,
    //   x: event.x,
    //   y: event.y,
    //   radie: radie,
    // };
    // // console.log("obj input", obj);
    // // Calcula el ángulo de inicio ajustado
    // const newSections = sectionsRedux.map((section, index) => {
    //   //agregar index a data
    //   return {
    //     ...section,
    //     startAngle:
    //       index === d.index && selectedAngle ? obj.deg : section.startAngle,
    //     endAngle:
    //       index === d.index && !selectedAngle ? obj.deg : section.endAngle,
    //   };
    // });

    // const newSections = sectionsRedux.map((section, index) => {
    //   return {
    //     ...section,
    //     startAngle:
    //       index === d.index && selectedAngle ? obj.deg : section.startAngle,
    //     endAngle:
    //       index === d.index && !selectedAngle ? obj.deg : section.endAngle,
    //   };
    // });

    // dispatch(saveSections(newSections));
  };

  const handleTargetDragEnd = (event, d) => {
    const rad = Math.atan2(event.y, event.x);
    const deg = rad * (180 / Math.PI) + 90;
    const hp = Math.sqrt(Math.pow(event.y, 2) + Math.pow(event.x, 2));
    const hpMax = svgRef.current.getBoundingClientRect().width / 2;
    const radius = hp / hpMax;

    const newTargets = targetsRedux.map((target, index) => {
      return {
        ...target,
        angle: index === d.index ? deg : target.angle,
        radius: index === d.index ? radius : target.radius,
      };
    });
    dispatch(saveTargets(newTargets));
  };

  const handleMouseDown = (event, d) => {
    isResizing = true;
  };

  const handleMouseUp = (event, d) => {
    isResizing = false;
  };

  const handleMouseMove = (event, d) => {
    if (isResizing) {
      const [x, y] = d3.pointer(event);
      const degrees = getDegreesByEvent(x, y);
      let newSectionsData = sectionsRedux.map((item) => {
        if (item.selected) {
          return { ...item, startAngle: degrees };
        } else {
          return item;
        }
      });
      dispatch(saveSections(newSectionsData));

      selectedSlice = { ...selectedSlice, startAngle: degrees };

      dispatch(saveItem(selectedSlice));
    }
  };

  return {
    handleSectionClick,
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
