import {
  addCirclesSVG,
  compareByEndElevation,
  generateReferencesDOM,
  setPositionCircle,
} from '../utils/index.js';
import * as d3 from 'd3';

export const useRadarComponent = ({
  sections,
  setSections,
  targets,
  settTargets,
  onClick,
  onDrag,
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
  const width = radius * 2;
  const height = width;

  if (sections) {
    sections.sort(compareByEndElevation);
  }
  if (targets) {
    targets.sort(compareByEndElevation);
  }

  const updateSelectedState = (dataArray, index) =>
    dataArray.map((data, idx) => ({ ...data, selected: idx === index }));

  const handleSectionClick = (event, section) => {
    event.stopPropagation();
    const newSectionsData = updateSelectedState(sections, section.index);
    let newSection = newSectionsData.find(
      (section) => section.selected === true
    );
    setSections((prevState) => {
      onClick(newSection);
      return newSectionsData;
    });
    let referencesClass = generateReferencesDOM(section.data);
    const drag = addEventDragCircles(section, newSection, referencesClass);
    setTimeout(() => {
      resetCircles(newSectionsData);
      addCirclesSVG(section.data, drag, referencesClass);
    }, 0);
  };

  const handleTargetsClick = (event, d) => {
    event.stopPropagation();
    const newTargetsData = updateSelectedState(targets, d.data.label);
    if (sections) {
      const newSectionsData = updateSelectedState(sections, null); // Unselect all sections
      setSections(newSectionsData);
    }
    settTargets(newTargetsData);
  };

  const handleTargetDragEnd = (event, d) => {
    const rad = Math.atan2(event.y, event.x);
    let degrees = rad * (180 / Math.PI) + 90;
    const hp = Math.sqrt(Math.pow(event.y, 2) + Math.pow(event.x, 2));
    const hpMax = svgRef.current.getBoundingClientRect().width / 2;
    const radius = hp / hpMax;

    degrees = Math.round(degrees);

    const newTargets = targets.map((target, index) => {
      return {
        ...target,
        angle: index === d.index ? degrees : target.angle,
        radius: index === d.index ? radius : target.radius,
      };
    });
    settTargets(newTargets);
  };

  const addEventDragCircles = (section, newSection, reference) => {
    const drag = d3
      .drag()
      .on('start', function () {
        d3.select(this).raise();
      })
      .on('end', function (event) {
        const degrees = getDegreesByEvent(event.x, event.y);
        if (d3.select(this).classed(reference.classStart)) {
          newSection = { ...newSection, startAngle: degrees };
          setPositionCircle(newSection, reference, true);
        }
        if (d3.select(this).classed(reference.classEnd)) {
          newSection = { ...newSection, endAngle: degrees };
          setPositionCircle(newSection, reference, false);
        }
      })
      .on('drag', function (event) {
        const degrees = getDegreesByEvent(event.x, event.y);
        if (d3.select(this).classed(reference.classStart)) {
          const saveItemStart = {
            ...newSection,
            startAngle: degrees,
            start: true,
          };
          updateReduxAngles(degrees, section.index);
          setPositionCircle(saveItemStart, reference, true);
          if (typeof onDrag === 'function') {
            onDrag(saveItemStart);
          }
        }
        if (d3.select(this).classed(reference.classEnd)) {
          const saveItemEnd = {
            ...newSection,
            endAngle: degrees,
            start: false,
          };
          updateReduxAngles(degrees, section.index, false);
          setPositionCircle(saveItemEnd, reference);
          if (typeof onDrag === 'function') {
            onDrag(saveItemEnd, false);
          }
        }
      });

    return drag;
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

  const getDegreesByEvent = (x, y) => {
    const angle = Math.atan2(y - height / 2, x - width / 2);
    let degrees = (angle * 180) / Math.PI + 90;

    if (degrees < 0) {
      degrees += 360;
    }

    degrees = Math.round(degrees);

    return degrees;
  };

  const updateReduxAngles = (degrees, index, start = true) => {
    if (start) {
      setSections((prevSectionsData) => {
        return prevSectionsData.map((item, idx) =>
          idx === index ? { ...item, startAngle: degrees } : item
        );
      });
    } else {
      setSections((prevSectionsData) => {
        return prevSectionsData.map((item, idx) =>
          idx === index ? { ...item, endAngle: degrees } : item
        );
      });
    }
  };

  return {
    handleSectionClick,
    handleTargetsClick,
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
