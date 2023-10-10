import { useDispatch } from 'react-redux';
import {
  changeEndAngle,
  changeStartAngle,
  saveItem,
  saveSections,
  saveTargets,
} from '../../../../redux/slices/dataSlice';
import {
  useSectionsSelector,
  useTargetsSelector,
} from '../../../../redux/hooks/dataHooks';
import * as d3 from 'd3';
import {
  setPositionCircle,
  getCoordinatesCircles,
  generateReferencesDOM,
} from '../../utils';

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
  const dispatch = useDispatch();
  const sectionsRedux = useSectionsSelector();
  const targetsRedux = useTargetsSelector();
  const width = radius * 2;
  const height = width;

  const updateSelectedState = (dataArray, label) =>
    dataArray.map((data) => ({ ...data, selected: data.label === label }));

  const handleSectionClick = (event, section) => {
    event.stopPropagation();
    const newSectionsData = updateSelectedState(
      sectionsRedux,
      section.data.label
    );
    let newSection = newSectionsData.find(
      (section) => section.selected === true
    );
    dispatch(saveItem(newSection));
    dispatch(saveSections(newSectionsData));
    resetCircles(newSectionsData);

    let referencesClass = generateReferencesDOM(section.data);

    const drag = addEventDragCircles(section.data, newSection, referencesClass);
    addCirclesSVG(section.data, drag, referencesClass);
  };

  const addCirclesSVG = (section, drag, reference) => {
    const svg = d3.select('svg');
    const { cxStart, cyStart, cxEnd, cyEnd } = getCoordinatesCircles(section);
    if (!reference.existCircleStart) {
      const startCircle = svg
        .append('circle')
        .attr('class', reference.classStart)
        .attr('r', 8);
      startCircle.attr('cx', cxStart).attr('cy', cyStart);
      startCircle.call(drag);
    }

    if (!reference.existCircleEnd) {
      const endCircle = svg
        .append('circle')
        .attr('class', reference.classEnd)
        .attr('r', 8);
      endCircle.attr('cx', cxEnd).attr('cy', cyEnd);
      endCircle.call(drag);
    }
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
        }
        if (d3.select(this).classed(reference.classEnd)) {
          newSection = { ...newSection, endAngle: degrees };
        }
      })
      .on('drag', function (event) {
        const degrees = getDegreesByEvent(event.x, event.y);
        if (d3.select(this).classed(reference.classStart)) {
          const saveItemStart = { ...newSection, startAngle: degrees };
          dispatch(saveItem(saveItemStart));
          updateReduxAngles(degrees, section.label);
          setPositionCircle(saveItemStart, reference, true);
        }
        if (d3.select(this).classed(reference.classEnd)) {
          const saveItemEnd = { ...newSection, endAngle: degrees };
          dispatch(saveItem(saveItemEnd));
          updateReduxAngles(degrees, section.label, false);
          setPositionCircle(saveItemEnd, reference, false);
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

  const updateReduxAngles = (degrees, label, start = true) => {
    if (start) {
      dispatch(changeStartAngle({ label, degrees }));
    } else {
      dispatch(changeEndAngle({ label, degrees }));
    }
  };

  const handleTargetsClick = (event, d) => {
    const newTargetsData = updateSelectedState(targetsRedux, d.data.label);
    dispatch(
      saveItem(newTargetsData.find((target) => target.selected === true))
    );
  };

  const handleTargetDragEnd = (event, d) => {
    const rad = Math.atan2(event.y, event.x);
    let degrees = rad * (180 / Math.PI) + 90;
    const hp = Math.sqrt(Math.pow(event.y, 2) + Math.pow(event.x, 2));
    const hpMax = svgRef.current.getBoundingClientRect().width / 2;
    const radius = hp / hpMax;

    degrees = Math.round(degrees);

    const newTargets = targetsRedux.map((target, index) => {
      return {
        ...target,
        angle: index === d.index ? degrees : target.angle,
        radius: index === d.index ? radius : target.radius,
      };
    });
    dispatch(saveTargets(newTargets));
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
